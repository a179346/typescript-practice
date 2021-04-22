FROM mariadb
ENV LANG=C.UTF-8
COPY script /usr/src/app/script/
RUN cat /usr/src/app/script/*.sql >> /docker-entrypoint-initdb.d/1.root.sql
# RUN cat /usr/src/app/script/patch/*.sql >> /docker-entrypoint-initdb.d/2.patch.sql

EXPOSE 3306