/*! Backoffice Frontend Application - Ember.js SPA */

(function() {
    'use strict';
    
    // Application configuration
    var config = {
        modulePrefix: 'backoffice-frontend',
        environment: 'production',
        rootURL: '/',
        locationType: 'auto',
        apiHost: window.location.origin,
        apiNamespace: 'api'
    };

    // Create the main application
    window.App = Ember.Application.create({
        name: config.modulePrefix,
        customEvents: {
            paste: 'paste'
        }
    });

    // Router configuration - safely handle routing
    if (window.App && window.App.Router && typeof window.App.Router.map === 'function') {
        try {
            App.Router.map(function() {
                this.route('login');
                this.route('dashboard');
                this.route('users', function() {
                    this.route('index');
                    this.route('show', { path: '/:user_id' });
                    this.route('new');
                    this.route('edit', { path: '/:user_id/edit' });
                });
                this.route('backoffice', function() {
                    this.route('dashboard');
                    this.route('settings');
                });
                this.route('admin', function() {
                    this.route('dashboard');
                    this.route('users');
                });
            });
        } catch (error) {
            console.warn('Router configuration failed, using simple routing:', error);
        }
    }

    // Simplified routing and controllers - avoid Ember complexities for now
    console.log('Setting up simplified Ember routes and controllers...');

    // Initialize the application
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Backoffice Frontend initializing...');
        
        // Remove loading indicator
        var loadingContainer = document.querySelector('.loading-container');
        if (loadingContainer) {
            loadingContainer.style.display = 'none';
        }
        
        // Render basic application structure
        var appHtml = `
            <div class="navbar">
                <div class="container">
                    <a href="/" class="navbar-brand">Backoffice Frontend</a>
                    <ul class="navbar-nav">
                        <li class="nav-item"><a href="/dashboard" class="nav-link">Dashboard</a></li>
                        <li class="nav-item"><a href="/users" class="nav-link">Usuarios</a></li>
                        <li class="nav-item"><a href="/admin" class="nav-link">Administración</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="main-container">
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <div id="ember-content">
                                <div class="dashboard-card">
                                    <h3>Bienvenido al Backoffice</h3>
                                    <p>Esta es una aplicación frontend Ember.js integrada con Spring Boot.</p>
                                    
                                    <div class="row" style="margin-top: 2rem;">
                                        <div class="col">
                                            <div class="dashboard-card">
                                                <h4>API Status</h4>
                                                <div id="api-status">Verificando conexión...</div>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="dashboard-card">
                                                <h4>Usuarios</h4>
                                                <div id="users-summary">Cargando...</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div style="margin-top: 2rem;">
                                        <a href="/api/users" class="btn btn-primary" target="_blank">Ver API de Usuarios</a>
                                        <button onclick="testApiConnection()" class="btn btn-primary">Probar API</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        $('#ember-app').html(appHtml);
        
        // Test API connection
        testApiConnection();
        loadUsersCount();
        
        console.log('Backoffice Frontend initialized successfully!');
    });

    // Utility functions
    window.testApiConnection = function() {
        $('#api-status').html('Verificando...');
        
        fetch('/api/users')
            .then(response => {
                if (response.ok) {
                    $('#api-status').html('<span style="color: green;">✓ API conectada</span>');
                    return response.json();
                } else {
                    throw new Error('API response: ' + response.status);
                }
            })
            .catch(error => {
                console.error('API connection failed:', error);
                $('#api-status').html('<span style="color: red;">✗ Error de conexión</span>');
            });
    };

    window.loadUsersCount = function() {
        fetch('/api/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(users => {
                // Ensure users is an array
                if (!Array.isArray(users)) {
                    console.warn('API returned non-array data:', users);
                    users = [];
                }
                $('#users-summary').html(`Total: ${users.length} usuarios`);
            })
            .catch(error => {
                console.error('Failed to load users count:', error);
                $('#users-summary').html('Error al cargar');
            });
    };

    // Handle routing with vanilla JavaScript event delegation
    document.addEventListener('click', function(e) {
        var target = e.target;
        if (target.tagName === 'A' && target.getAttribute('href') && target.getAttribute('href').startsWith('/')) {
            var href = target.getAttribute('href');
            if (href.startsWith('/api/')) {
                return; // Let API links work normally
            }
            
            e.preventDefault();
            window.history.pushState({}, '', href);
            
            // Simple routing logic
            if (href === '/users') {
                window.loadUsersPage();
            } else if (href === '/dashboard') {
                window.location.reload(); // Reload to show dashboard
            }
        }
    });

    window.loadUsersPage = function() {
        fetch('/api/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(users => {
                // Ensure users is an array
                if (!Array.isArray(users)) {
                    console.warn('API returned non-array data:', users);
                    users = [];
                }
                
                var usersHtml = `
                    <div class="dashboard-card">
                        <h3>Gestión de Usuarios</h3>
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                `;
                
                users.forEach(user => {
                    usersHtml += `
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.name}</td>
                            <td>
                                <button class="btn btn-primary" onclick="editUser(${user.id})">Editar</button>
                            </td>
                        </tr>
                    `;
                });
                
                usersHtml += `
                            </tbody>
                        </table>
                        <div style="margin-top: 1rem;">
                            <a href="/dashboard" class="btn btn-primary">Volver al Dashboard</a>
                        </div>
                    </div>
                `;
                
                $('#ember-content').html(usersHtml);
            })
            .catch(error => {
                console.error('Error loading users:', error);
                $('#ember-content').html('<div class="alert alert-error">Error al cargar usuarios</div>');
            });
    };

    window.editUser = function(userId) {
        alert('Función de editar usuario ' + userId + ' - Implementar según necesidades');
    };

})();