#!/bin/sh

docker build -t "front" .

docker run -p 8080:8082 -e "API_URL=LASSI" -e PORT=8082 front