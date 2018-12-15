#!/bin/sh

# Build front
cd front
npm run build

# move dist to backend root
rm -rf ../backend/dist

# copy dist to backend root
cp -r dist ../backend/

cd ../backend

# build docker image
docker build -t "videosite" .