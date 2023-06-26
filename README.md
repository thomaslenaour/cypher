# Cypher App

## Getting started

```sh
git clone https://github.com/thomaslenaour/cypher
cd cypher
npm install
npm install -g nx # if not already installed
brew install livekit
```

## Applications

### Front (Next.js)

#### Run

```sh
nx serve front
```

### API (Nest.js)

#### Pre-requisites

- Docker installed and running
- LiveKit server installed and running

#### Run

In the first terminal:

```sh
livekit-server --dev
```

In the second terminal:

```sh
nx serve api
```
