# Build the backend app container
docker build \
    -t feedback-app:v3.5 \
    -t feedback-app:latest \
    -t galaataman/feedback-app:v3.5 \
    -t galaataman/feedback-app:latest .

# Create a docker network for the app
docker network create feedback-app-nw

# Run the postgres database container
docker run \
    --name postgres-db \
    --network feedback-app-nw \
    -p 5432:5432 \
    -e POSTGRES_PASSWORD=password \
    -e POSTGRES_DB=feedbackdb \
    -v feedback-app-data:/var/lib/postgresql/data \
    -d \
    --rm \
    postgres

# Run the backend app container
docker run \
    --name feedback-app \
    --network feedback-app-nw \
    -p 3030:3000 \
    -d \
    --rm \
    feedback-app

# Stop the containers
docker stop feedback-app postgres-db

# Remove the containers
docker rm feedback-app postgres-db