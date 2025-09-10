# Integración Frontend - Backoffice Ember.js

Este documento describe la integración del frontend Ember.js en el proyecto Spring Boot.

## Arquitectura de la Integración

```
demo/
├── src/main/
│   ├── java/
│   │   └── com/example/demo/
│   │       ├── config/WebConfig.java          # Configuración recursos estáticos
│   │       └── controller/FrontendController.java # Routing SPA
│   └── resources/
│       └── static/                           # Frontend compilado
│           ├── index.html                    # Aplicación principal
│           ├── assets/                       # JS y CSS compilados
│           │   ├── vendor.js                 # Librerías (Ember, jQuery)
│           │   ├── vendor.css                # CSS de librerías
│           │   ├── backoffice-frontend.js    # Aplicación Ember
│           │   └── backoffice-frontend.css   # Estilos de la app
│           ├── css/                          # CSS adicionales
│           ├── js/                           # JS adicionales
│           └── images/                       # Recursos gráficos
└── frontend/                                 # Código fuente frontend (opcional)
    ├── package.json                          # Dependencias Node.js
    ├── ember-cli-build.js                    # Configuración build
    └── app/                                  # Código fuente Ember
```

## Configuración Spring Boot

### WebConfig.java
Configura el serving de recursos estáticos y cache:
- `/assets/**` → `classpath:/static/assets/` (cache 1 año)
- `/css/**` → `classpath:/static/css/` (cache 1 año)
- `/js/**` → `classpath:/static/js/` (cache 1 año)
- `/images/**` → `classpath:/static/images/` (cache 1 año)
- `/**` → `classpath:/static/` (sin cache para HTML)

### FrontendController.java
Maneja el routing de SPA:
- Rutas frontend: `/`, `/backoffice`, `/admin`, `/dashboard`, `/users`
- Forward a `index.html` para routing cliente
- Excluye rutas API (`/api/*`)

## Estructura del Frontend

### index.html
- **Framework**: Ember.js 3.28+
- **Dependencias**: jQuery mock, Handlebars
- **Rutas**: Dashboard, Users, Admin, Backoffice
- **API Integration**: Conexión con endpoints `/api/*`

### Assets
- **vendor.js**: Librerías externas (Ember, jQuery mock)
- **vendor.css**: Estilos base y utilidades
- **backoffice-frontend.js**: Aplicación Ember principal
- **backoffice-frontend.css**: Estilos específicos del backoffice

## Rutas Configuradas

### Frontend (SPA)
```javascript
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
```

### API Backend
- `GET|POST|PUT|DELETE /api/users/**`
- `POST /api/users/login`
- `GET /api/hello`
- `GET /api/status`

## Funcionalidades Implementadas

### Dashboard
- Estadísticas de usuarios
- Estado de conexión API
- Navegación principal

### Gestión de Usuarios
- Listado de usuarios
- Integración con API REST
- Manejo de errores
- Funciones CRUD básicas

### Navegación
- Menú principal responsive
- Routing SPA completo
- Fallback para rutas no existentes

## Build y Despliegue

### Desarrollo Local
```bash
# Iniciar aplicación (incluye frontend)
mvn spring-boot:run

# Accesos
Frontend: http://localhost:8080/
API:      http://localhost:8080/api/
```

### Producción (WAR)
```bash
# Build completo
mvn clean package

# El WAR incluye:
# - Backend Spring Boot
# - Frontend compilado embebido
# - Todos los recursos estáticos
```

### Testing
```bash
# Frontend principal
curl http://localhost:8080/

# Rutas SPA
curl http://localhost:8080/dashboard
curl http://localhost:8080/users
curl http://localhost:8080/admin

# API
curl http://localhost:8080/api/users
curl http://localhost:8080/api/hello

# Recursos estáticos
curl http://localhost:8080/assets/backoffice-frontend.css
curl http://localhost:8080/assets/vendor.js
```

## Extensión y Mantenimiento

### Agregar Nueva Ruta Frontend
1. **Actualizar FrontendController.java**:
   ```java
   @RequestMapping(value = {"/nueva-ruta", "/nueva-ruta/**"})
   public String forward(HttpServletRequest request) {
       return "forward:/index.html";
   }
   ```

2. **Agregar en WebConfig.java**:
   ```java
   registry.addViewController("/nueva-ruta/**")
       .setViewName("forward:/index.html");
   ```

3. **Configurar en Ember router** (backoffice-frontend.js):
   ```javascript
   App.Router.map(function() {
       this.route('nueva-ruta');
   });
   ```

### Actualizar Frontend
1. **Modificar archivos en** `src/main/resources/static/`
2. **Recompilar**: `mvn clean compile`
3. **Reiniciar**: `mvn spring-boot:run`

### Habilitar Build Automático (Opcional)
Descomentar en `pom.xml` el `frontend-maven-plugin` cuando tengas:
- Proyecto Ember.js completo en `/frontend`
- `package.json` con dependencias válidas
- Comando `npm run build` funcional

## Compatibilidad

### Navegadores Soportados
- Chrome 60+
- Firefox 55+
- Safari 10+
- Edge 15+

### Servidores de Aplicaciones
- ✅ Tomcat 9/10
- ✅ JBoss EAP 7+
- ✅ WildFly 20+
- ✅ Desarrollo (Embedded Tomcat)

## Solución de Problemas

### Frontend no carga
- Verificar que `index.html` existe en `src/main/resources/static/`
- Comprobar logs de Spring Boot
- Verificar que no hay conflictos con otros controllers

### Recursos CSS/JS no se cargan
- Verificar rutas en `WebConfig.java`
- Comprobar que archivos existen en `static/assets/`
- Verificar cache del navegador

### API no responde
- Comprobar que endpoints están en `/api/*`
- Verificar configuración CORS si es necesario
- Revisar logs de errores en consola

### Routing no funciona
- Verificar `FrontendController.java` incluye la ruta
- Comprobar que no conflicta con API routes
- Verificar JavaScript de routing en frontend