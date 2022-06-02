# p3

**p3** is a reverse proxy service used in development of the palletpals-client. Different localhost ports are treated as different domains in browsers, i.e. preventing the authentication logic. To solve this issue, **p3** serves as the gateway for both the server and client. Therefore, both can be reached on the same port (:80) and the authentication logic is working again. In production this issue is non existent, as the client is built and served from the server.

## Getting Started

**p3** can either be run on the host system with Go or inside a Docker container. When started, the client is available on http://localhost and the server on http://localhost/api.

## Run with Go

### Prerequisites

- Go (_tested with Go v1.18_)

**p3** can either first be built and run or directly be run with Go.

```bash
# build and run
go build -o ./bin/p3 ./cmd
./bin/p3

# run directly
go run ./cmd
```

In any case, depending on the operating system, a prompt can appear that asks for networking permissions.

## Run with Docker

### Prerequisites

- Docker (_tested with Docker Engine v20.10.12 and v20.10.14_)

The Dockerfile provided builds and runs **p3**. Additionally, `run.sh` already includes the commands to build the Docker image and run a Docker container and can simply be executed.

```bash
./run.sh
```
