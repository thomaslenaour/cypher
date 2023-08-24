#!/bin/sh -e

usage() {
  echo "OVERVIEW: Build apps according to NX_APP_NAME value. Meant to be used for Heroku deployment"
  exit
}

if [ "$1" = '-h' ] || [ "$1" = '--help' ]; then
  usage
fi

(
  PROJECT_ROOT="$(cd $(dirname $0)/..; pwd)"

  cd $PROJECT_ROOT

  if [ "$NX_APP_NAME" = "api" ]; then
    npm run prisma:generate
    nx build api --prod
  else
    echo "Error: no build config for NX_APP_NAME value '$NX_APP_NAME'"
    exit 1
  fi
)