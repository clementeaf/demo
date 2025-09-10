#!/bin/bash

# Configuration - Update these paths for your environment
WILDFLY_HOME=${WILDFLY_HOME:-"/opt/wildfly"}
APP_NAME="demo"

echo "=========================================="
echo "Deploying to WildFly..."
echo "=========================================="

# Check if WILDFLY_HOME exists
if [ ! -d "$WILDFLY_HOME" ]; then
    echo "❌ WILDFLY_HOME not found: $WILDFLY_HOME"
    echo "Please set WILDFLY_HOME environment variable or update this script"
    exit 1
fi

# Build first
echo "Building WAR file..."
mvn clean package -DskipTests

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

# Check if WildFly is running
if ! pgrep -f "wildfly\|jboss" > /dev/null; then
    echo "Starting WildFly..."
    $WILDFLY_HOME/bin/standalone.sh > /dev/null 2>&1 &
    sleep 10
fi

# Deploy using CLI
echo "Deploying via CLI..."
$WILDFLY_HOME/bin/jboss-cli.sh --connect --command="deploy target/demo-0.0.1-SNAPSHOT.war --name=$APP_NAME.war --force" 2>/dev/null

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ DEPLOYMENT COMPLETE"
    echo "Application URL: http://localhost:8080/$APP_NAME/api/users"
    echo "Logs: $WILDFLY_HOME/standalone/log/server.log"
    echo ""
    echo "Wait a few seconds and test with:"
    echo "curl http://localhost:8080/$APP_NAME/api/users"
else
    echo "CLI deployment failed, trying file copy method..."
    
    # Alternative: Copy to deployments directory
    cp target/demo-0.0.1-SNAPSHOT.war $WILDFLY_HOME/standalone/deployments/$APP_NAME.war
    
    echo ""
    echo "✅ DEPLOYMENT COMPLETE (via file copy)"
    echo "Application URL: http://localhost:8080/$APP_NAME/api/users"
    echo "Check deployment status in: $WILDFLY_HOME/standalone/deployments/"
fi