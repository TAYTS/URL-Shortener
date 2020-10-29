#! /bin/bash

echo "Build app Docker images"
docker-compose build mysqldb
docker-compose build backend
docker-compose build --build-arg REACT_APP_API_URL=$REACT_APP_API_URL frontend

echo "Push app Docker images to Docker hub"
docker-compose push mysqldb
docker-compose push backend
docker-compose push frontend
