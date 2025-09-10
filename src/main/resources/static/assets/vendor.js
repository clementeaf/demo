/*! Vendor JS Bundle - Contains Ember.js, jQuery, and other vendor libraries */

// Mock Ember.js structure for demonstration
(function() {
    'use strict';
    
    // Mock jQuery
    window.$ = window.jQuery = function(selector) {
        if (typeof selector === 'string') {
            return {
                ready: function(fn) { 
                    if (document.readyState !== 'loading') fn();
                    else document.addEventListener('DOMContentLoaded', fn);
                },
                on: function(event, handler) {
                    document.addEventListener(event, handler);
                    return this;
                },
                addClass: function(className) {
                    var elements = document.querySelectorAll(selector);
                    elements.forEach(el => el.classList.add(className));
                    return this;
                },
                removeClass: function(className) {
                    var elements = document.querySelectorAll(selector);
                    elements.forEach(el => el.classList.remove(className));
                    return this;
                },
                html: function(content) {
                    var elements = document.querySelectorAll(selector);
                    if (content !== undefined) {
                        elements.forEach(el => el.innerHTML = content);
                        return this;
                    }
                    return elements[0] ? elements[0].innerHTML : '';
                },
                hide: function() {
                    var elements = document.querySelectorAll(selector);
                    elements.forEach(el => el.style.display = 'none');
                    return this;
                },
                show: function() {
                    var elements = document.querySelectorAll(selector);
                    elements.forEach(el => el.style.display = 'block');
                    return this;
                }
            };
        }
        return {};
    };
    
    // Mock Ember
    window.Ember = {
        VERSION: '3.28.0',
        Application: {
            create: function(config) {
                console.log('Creating Ember Application with config:', config);
                var app = {
                    visit: function(route) {
                        console.log('Visiting route:', route);
                    }
                };
                // Create Router with map method
                app.Router = {
                    map: function(callback) {
                        console.log('Configuring routes...');
                        var router = {
                            route: function(name, options, callback) {
                                console.log('Adding route:', name, options);
                                if (typeof options === 'function') {
                                    options.call(router);
                                } else if (callback) {
                                    callback.call(router);
                                }
                            }
                        };
                        if (callback) {
                            callback.call(router);
                        }
                    }
                };
                return app;
            }
        },
        Component: {
            extend: function(props) {
                return function() { return props; };
            }
        },
        Route: {
            extend: function(props) {
                return function() { return props; };
            }
        },
        Controller: {
            extend: function(props) {
                return function() { return props; };
            }
        },
        Router: {
            extend: function(props) {
                return function() { return props; };
            }
        },
        Service: {
            extend: function(props) {
                return function() { return props; };
            }
        }
    };
    
    // Mock Handlebars
    window.Handlebars = {
        compile: function(template) {
            return function(context) {
                return template.replace(/\{\{(\w+)\}\}/g, function(match, key) {
                    return context[key] || '';
                });
            };
        }
    };

    console.log('Vendor libraries loaded successfully');
})();