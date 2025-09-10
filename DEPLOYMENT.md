# Guía de Despliegue - Demo Spring Boot Application

Esta aplicación Spring Boot está configurada para generar un archivo WAR compatible con servidores Tomcat y JBoss/WildFly, con un **frontend Ember.js integrado** que se sirve desde la misma aplicación.

## Prerrequisitos

- Java 8 o superior
- Maven 3.6+
- SQL Server (puede ejecutarse en Docker)
- Servidor de aplicaciones (Tomcat 9+ o JBoss EAP/WildFly 20+)

## Compilación del WAR

```bash
# Compilar y generar el archivo WAR
mvn clean package

# El archivo WAR se generará en:
# target/demo-0.0.1-SNAPSHOT.war
```

## Configuración de Base de Datos

### SQL Server con Docker
```bash
# Iniciar SQL Server
docker-compose up -d

# Verificar que el container esté corriendo
docker ps
```

### Configuración Manual
Si usás SQL Server instalado localmente, actualizar `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:sqlserver://TU_SERVIDOR:1433;encrypt=true;trustServerCertificate=true
spring.datasource.username=TU_USUARIO
spring.datasource.password=TU_PASSWORD
```

## Despliegue en Tomcat

### Tomcat 9/10
1. **Detener Tomcat** (si está corriendo)
   ```bash
   $TOMCAT_HOME/bin/shutdown.sh
   ```

2. **Copiar el WAR**
   ```bash
   cp target/demo-0.0.1-SNAPSHOT.war $TOMCAT_HOME/webapps/demo.war
   ```

3. **Iniciar Tomcat**
   ```bash
   $TOMCAT_HOME/bin/startup.sh
   ```

4. **Verificar despliegue**
   - URL: `http://localhost:8080/demo/api/users`
   - Logs: `$TOMCAT_HOME/logs/catalina.out`

### Configuración Tomcat (opcional)
Crear `$TOMCAT_HOME/conf/Catalina/localhost/demo.xml`:
```xml
<Context docBase="/path/to/demo.war" reloadable="true">
    <Resource name="jdbc/DemoDS" 
              auth="Container"
              type="javax.sql.DataSource"
              driverClassName="com.microsoft.sqlserver.jdbc.SQLServerDriver"
              url="jdbc:sqlserver://localhost:1433;databaseName=demo_db"
              username="sa"
              password="Password123!" />
</Context>
```

## Despliegue en JBoss/WildFly

### WildFly 20+
1. **Iniciar WildFly**
   ```bash
   $WILDFLY_HOME/bin/standalone.sh
   ```

2. **Desplegar via CLI**
   ```bash
   $WILDFLY_HOME/bin/jboss-cli.sh --connect
   [standalone@localhost:9990 /] deploy target/demo-0.0.1-SNAPSHOT.war
   ```

3. **Desplegar copiando archivo**
   ```bash
   cp target/demo-0.0.1-SNAPSHOT.war $WILDFLY_HOME/standalone/deployments/demo.war
   ```

4. **Verificar despliegue**
   - URL: `http://localhost:8080/demo/api/users`
   - Logs: `$WILDFLY_HOME/standalone/log/server.log`

### Configuración DataSource en WildFly
```bash
# Agregar driver SQL Server
$WILDFLY_HOME/bin/jboss-cli.sh --connect
[standalone@localhost:9990 /] /subsystem=datasources/jdbc-driver=sqlserver:add(driver-name=sqlserver,driver-module-name=com.microsoft.sqlserver,driver-xa-datasource-class-name=com.microsoft.sqlserver.jdbc.SQLServerXADataSource)

# Crear DataSource
[standalone@localhost:9990 /] data-source add --name=DemoDS --jndi-name=java:/DemoDS --driver-name=sqlserver --connection-url=jdbc:sqlserver://localhost:1433;databaseName=demo_db --user-name=sa --password=Password123!
```

## Endpoints Disponibles

Una vez desplegada la aplicación, los siguientes endpoints estarán disponibles:

### Frontend (Backoffice)
- `GET /demo/` - Aplicación frontend principal
- `GET /demo/dashboard` - Dashboard del backoffice
- `GET /demo/users` - Gestión de usuarios (frontend)
- `GET /demo/admin` - Panel de administración
- `GET /demo/backoffice` - Rutas del backoffice

### API REST
- `GET /demo/api/users` - Listar todos los usuarios
- `GET /demo/api/users/{id}` - Obtener usuario por ID
- `POST /demo/api/users` - Crear nuevo usuario
- `PUT /demo/api/users/{id}` - Actualizar usuario
- `DELETE /demo/api/users/{id}` - Eliminar usuario
- `POST /demo/api/users/login` - Login de usuario
- `GET /demo/api/hello` - Endpoint de prueba
- `GET /demo/api/status` - Estado de la aplicación

### Recursos Estáticos
- `GET /demo/assets/*` - CSS, JS, imágenes del frontend
- `GET /demo/css/*` - Archivos CSS adicionales
- `GET /demo/js/*` - Archivos JavaScript adicionales

### Ejemplo de uso
```bash
# Crear usuario
curl -X POST http://localhost:8080/demo/api/users \
     -H "Content-Type: application/json" \
     -d '{"name":"testuser","password":"password123"}'

# Login
curl -X POST http://localhost:8080/demo/api/users/login \
     -H "Content-Type: application/json" \
     -d '{"name":"testuser","password":"password123"}'
```

## Solución de Problemas

### Error de conexión a BD
- Verificar que SQL Server esté corriendo
- Verificar credenciales en `application.properties`
- Revisar firewall y puertos

### Error de despliegue
- Verificar logs del servidor de aplicaciones
- Comprobar que el WAR no esté corrupto
- Verificar versión de Java compatible

### Context Path
La aplicación se despliega en `/demo` por defecto. Para cambiar:
- **Tomcat**: Renombrar el archivo WAR
- **JBoss**: Modificar `jboss-web.xml`

## Scripts de Build

### Build Script (build.sh)
```bash
#!/bin/bash
echo "Building WAR file..."
mvn clean package -DskipTests
echo "WAR file generated: target/demo-0.0.1-SNAPSHOT.war"
```

### Deploy Script Tomcat (deploy-tomcat.sh)
```bash
#!/bin/bash
TOMCAT_HOME=/path/to/tomcat
mvn clean package -DskipTests
$TOMCAT_HOME/bin/shutdown.sh
cp target/demo-0.0.1-SNAPSHOT.war $TOMCAT_HOME/webapps/demo.war
$TOMCAT_HOME/bin/startup.sh
echo "Deployed to Tomcat"
```

### Deploy Script WildFly (deploy-wildfly.sh)
```bash
#!/bin/bash
WILDFLY_HOME=/path/to/wildfly
mvn clean package -DskipTests
$WILDFLY_HOME/bin/jboss-cli.sh --connect --command="deploy target/demo-0.0.1-SNAPSHOT.war --force"
echo "Deployed to WildFly"
```