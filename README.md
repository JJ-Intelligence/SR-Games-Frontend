
## Prerequisites

- node.js
- Docker


## Setting up

Run `npm install` to install the node modules

## Starting dev server

Run `npm start`

Access at localhost:3000

## Starting prod server

Run `docker-compose -f docker-compose.yml up -d --build`

Access at localhost:80

## Manual Deploy
Update the tag to create a new version
```
export PROJECT_ID=jjgames
export TAG=v4
docker build -f Dockerfile -t gcr.io/$PROJECT_ID/sr-games:$TAG .
gcloud services enable containerregistry.googleapis.com
gcloud auth configure-docker
docker push gcr.io/$PROJECT_ID/sr-games:$TAG
```