# Use an official Node.js runtime as the base image
FROM alpine:latest

# Install dependencies (if needed)
RUN apk add --no-cache curl bash
RUN apk add --no-cache --upgrade grep
RUN apk --update add tar

# Install Livekit using the provided script
RUN curl -sSL https://get.livekit.io | bash

# Expose the necessary ports for Livekit
EXPOSE 7880