
FROM eclipse-temurin:21 AS build


RUN apt-get update && \
    apt-get install -y maven


WORKDIR /home/app


COPY pom.xml /home/app/


COPY src /home/app/src/

# Run Maven to package the application
RUN mvn clean package -DskipTests


FROM eclipse-temurin:21-jre

COPY --from=build /home/app/target/*.jar /app.jar


EXPOSE 8080


ENTRYPOINT ["java", "-jar", "/app.jar"]
