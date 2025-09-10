#!/bin/bash

echo "=========================================="
echo "Building Spring Boot WAR..."
echo "=========================================="

# Clean and build
mvn clean package -DskipTests

# Check if build was successful
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL"
    echo "WAR file generated: target/demo-0.0.1-SNAPSHOT.war"
    echo "File size: $(ls -lh target/demo-0.0.1-SNAPSHOT.war | awk '{print $5}')"
    echo ""
    echo "Deploy instructions:"
    echo "  Tomcat: ./deploy-tomcat.sh"
    echo "  WildFly: ./deploy-wildfly.sh"
else
    echo ""
    echo "❌ BUILD FAILED"
    echo "Check the error messages above"
    exit 1
fi