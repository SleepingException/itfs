FROM maven:3.8-openjdk-17 as dependencies

WORKDIR /workspace/app

COPY pom.xml ./pom.xml
COPY backend/pom.xml ./backend/pom.xml

RUN mkdir /root/.m2/

RUN mvn --projects backend --also-make dependency:go-offline -DskipTests
RUN mvn --projects backend --also-make dependency:resolve-plugins -DskipTests

FROM maven:3.8-openjdk-17 as app

COPY --from=dependencies /root/.m2/ /root/.m2/
COPY --from=dependencies /workspace/app /workspace/app
WORKDIR /workspace/app

COPY backend/src ./backend/src

RUN mvn --projects backend --also-make install -DskipTests

RUN mv ./backend/target/backend*.jar /opt/app.jar

EXPOSE 8081

CMD java -Duser.language=ru -jar /opt/app.jar