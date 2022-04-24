FROM golang:1.18-alpine

WORKDIR /usr/src/p3

# pre-copy/cache go.mod for pre-downloading dependencies and only redownloading them in subsequent builds if they change
COPY go.mod ./
RUN go mod download && go mod verify

COPY . .
RUN go build -v -o /usr/local/bin/p3 ./cmd

CMD ["p3", "--config", "docker"]