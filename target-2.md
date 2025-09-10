Integrar frontend del backoffice en proyecto Spring Boot embebido

Descripción

## Objetivo
Integrar el código del frontend del backoffice (backoffice-frontend) en el nuevo proyecto Spring Boot, de manera que el aplicativo frontend quede embebido y se sirva desde la aplicación Spring Boot.

## Contexto
- El proyecto Spring Boot (SRARG-67) generará un WAR para despliegue en Tomcat/JBoss
- Se necesita integrar el frontend existente del backoffice para que sea servido desde el mismo servidor de aplicaciones
- El frontend debe quedar embebido en el proyecto Spring Boot

## Requisitos Técnicos
- **Frontend existente**: Código del backoffice-frontend (Ember.js)
- **Backend**: Proyecto Spring Boot (SRARG-67)
- **Integración**: Frontend embebido en Spring Boot
- **Servicio estático**: Spring Boot debe servir los archivos estáticos del frontend

## Tareas a realizar
1. **Análisis del frontend existente**
    - Revisar estructura del proyecto backoffice-frontend
    - Identificar archivos estáticos y recursos
    - Analizar dependencias y configuración de build

2. **Configuración de Spring Boot para servir archivos estáticos**
    - Configurar `WebMvcConfigurer` para servir recursos estáticos
    - Configurar rutas para el frontend
    - Ajustar configuración de CORS si es necesario

3. **Integración de archivos del frontend**
    - Copiar archivos compilados del frontend a `src/main/resources/static`
    - Integrar archivos CSS, JS, imágenes y otros recursos
    - Configurar rutas de acceso a los recursos

4. **Configuración de build**
    - Modificar `pom.xml` para incluir el proceso de build del frontend
    - Configurar Maven para ejecutar el build del frontend antes del build de Spring Boot
    - Integrar scripts de build del frontend en el proceso de Maven

5. **Configuración de rutas y controladores**
    - Crear controladores para servir el frontend
    - Configurar rutas para SPA (Single Page Application)
    - Manejar rutas del frontend desde Spring Boot

6. **Testing y validación**
    - Verificar que el frontend se carga correctamente
    - Probar todas las rutas del frontend
    - Validar que los recursos estáticos se sirven correctamente
    - Probar en ambos servidores (Tomcat y JBoss)

## Estructura esperada del proyecto
```
src/
├── main/
│   ├── java/
│   │   └── [Código Spring Boot]
│   └── resources/
│       ├── static/
│       │   ├── assets/
│       │   ├── css/
│       │   ├── js/
│       │   └── index.html
│       └── application.properties
└── pom.xml
```

## Entregables
- Proyecto Spring Boot con frontend integrado
- Configuración de Maven para build completo
- Documentación de la integración
- Scripts de build y despliegue actualizados

## Criterios de aceptación
- [ ] El frontend se carga correctamente desde Spring Boot
- [ ] Todos los recursos estáticos (CSS, JS, imágenes) se sirven correctamente
- [ ] Las rutas del frontend funcionan correctamente
- [ ] El build de Maven incluye el frontend automáticamente
- [ ] La aplicación completa (backend + frontend) se despliega en Tomcat y JBoss
- [ ] No hay errores de CORS o recursos faltantes
- [ ] La experiencia de usuario es idéntica al frontend original

## Dependencias
- **Bloquea**: SRARG-67 (Crear proyecto Spring Boot que genere archivo WAR)
- **Relacionada con**: Integración del frontend existente del backoffice