# Cypher App

## Pre-requisites

### Livekit

```sh
brew install livekit
```

### Docker

https://docs.docker.com/get-docker/

## Getting started

```sh
git clone https://github.com/thomaslenaour/cypher
cd cypher
nvm use # if you have nvm installed
npm install
npm install -g nx # if not already installed
```

## Applications

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

In another terminal:

```sh
livekit-server --dev
```
