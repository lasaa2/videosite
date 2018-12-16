#!/bin/bash


# backend up

docker-compose up -d

# front up

cd ./front
npm run dev