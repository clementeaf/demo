#!/bin/bash

# Configuration - Update these paths for your environment
TOMCAT_HOME=${TOMCAT_HOME:-"/usr/local/tomcat"}
APP_NAME="demo"

echo "=========================================="
echo "Deploying to Tomcat..."
echo "=========================================="

# Check if TOMCAT_HOME exists
if [ ! -d "$TOMCAT_HOME" ]; then
    echo "❌ TOMCAT_HOME not found: $TOMCAT_HOME"
    echo "Please set TOMCAT_HOME environment variable or update this script"
    exit 1
fi

# Build first
echo "Building WAR file..."
mvn clean package -DskipTests

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

# Stop Tomcat
echo "Stopping Tomcat..."
if [ -f "$TOMCAT_HOME/bin/shutdown.sh" ]; then
    $TOMCAT_HOME/bin/shutdown.sh
    sleep 5
fi

# Remove old deployment
if [ -d "$TOMCAT_HOME/webapps/$APP_NAME" ]; then
    echo "Removing old deployment..."
    rm -rf $TOMCAT_HOME/webapps/$APP_NAME
fi

if [ -f "$TOMCAT_HOME/webapps/$APP_NAME.war" ]; then
    rm -f $TOMCAT_HOME/webapps/$APP_NAME.war
fi

# Copy new WAR
echo "Copying WAR file..."
cp target/demo-0.0.1-SNAPSHOT.war $TOMCAT_HOME/webapps/$APP_NAME.war

# Start Tomcat
echo "Starting Tomcat..."
$TOMCAT_HOME/bin/startup.sh

echo ""
echo "✅ DEPLOYMENT COMPLETE"
echo "Application URL: http://localhost:8080/$APP_NAME/api/users"
echo "Logs: $TOMCAT_HOME/logs/catalina.out"
echo ""
echo "Wait a few seconds and test with:"
echo "curl http://localhost:8080/$APP_NAME/api/users"