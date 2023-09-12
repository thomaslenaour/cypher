# Cypher App

## Getting started

```sh
git clone https://github.com/thomaslenaour/cypher
cd cypher
npm install
npm install -g nx # if not already installed
```

## Applications

### Dev Services

#### Services

- PostgreSQL
- Livekit server in dev mode

#### Pre-requisites

- Docker installed and running

#### Run

```sh
docker-compose up -d
```

### Front (Next.js)

#### Run

```sh
nx serve front
```

### API (Nest.js)

#### Run

In the second terminal:

```sh
nx serve api
```
