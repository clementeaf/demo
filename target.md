## Objetivo
Crear un nuevo proyecto Spring Boot que genere un archivo WAR (Web Application Archive) que pueda ser desplegado tanto en servidores Tomcat como JBoss.

## Requisitos Técnicos
- **Framework**: Spring Boot
- **Tipo de empaquetado**: WAR (no JAR)
- **Compatibilidad**: Tomcat y JBoss
- **Configuración**: Debe incluir configuración para ambos servidores de aplicaciones

## Tareas a realizar
1. **Configuración del proyecto**
    - Crear estructura de proyecto Spring Boot
    - Configurar `pom.xml` para generar WAR
    - Configurar packaging como `war` en lugar de `jar`

2. **Configuración de servlet**
    - Extender `SpringBootServletInitializer`
    - Configurar `@SpringBootApplication` correctamente
    - Asegurar compatibilidad con servlet containers

3. **Configuración específica para Tomcat**
    - Configurar `web.xml` si es necesario
    - Ajustar dependencias para Tomcat

4. **Configuración específica para JBoss**
    - Crear `jboss-web.xml` si es necesario
    - Configurar dependencias para JBoss
    - Asegurar compatibilidad con JBoss EAP/WildFly

5. **Testing y validación**
    - Crear tests unitarios básicos
    - Validar que el WAR se genera correctamente
    - Probar despliegue en ambos servidores

## Entregables
- Proyecto Spring Boot funcional
- Archivo WAR generado
- Documentación de despliegue para Tomcat y JBoss
- Scripts de build y despliegue

## Criterios de aceptación
- [ ] El proyecto compila sin errores
- [ ] Se genera un archivo WAR válido
- [ ] El WAR se despliega correctamente en Tomcat
- [ ] El WAR se despliega correctamente en JBoss
- [ ] La aplicación responde correctamente en ambos servidores
- [ ] Se incluye documentación de despliegue