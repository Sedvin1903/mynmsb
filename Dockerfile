# Use an official Maven image as a build stage
FROM maven:3.8-openjdk-17 AS build

WORKDIR /app

# Copy the POM file and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the project source code
COPY src src

# Build the application
RUN mvn package -DskipTests

# Use an official OpenJDK image for the final image
FROM openjdk:17-jdk-slim

EXPOSE 8081

WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=build /app/target/sias.jar app.jar

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
