#!/bin/bash

sudo docker compose -f ./test/docker-compose.test.yml up -d

typeorm-ts-node-commonjs migration:run --dataSource ./ormconfig.js

#npm migration:run

npx jest --config ./test/jest-e2e.json --detectOpenHandles

sudo docker compose -f ./test/docker-compose.test.yml down --volumes
