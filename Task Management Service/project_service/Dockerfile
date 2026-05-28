# project-service/Dockerfile
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copy the built jar (name matches your artifactId)
COPY target/project-service-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]