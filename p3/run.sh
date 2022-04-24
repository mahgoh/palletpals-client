# build docker image
docker build -t mahgoh/p3 .

# run docker image
docker run --rm -p 80:80 mahgoh/p3