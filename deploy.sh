echo "test"
export PROJECT_ID=jjgames
cd sr-games
docker build -f Dockerfile.prod -t gcr.io/$PROJECT_ID/sr-games:v3 .
gcloud services enable containerregistry.googleapis.com
gcloud auth configure-docker
docker push gcr.io/$PROJECT_ID/sr-games:v3
read