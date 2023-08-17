#!/bin/bash

sudo docker compose -f ./test/docker-compose.test.yml up -d

npm run build

typeorm-ts-node-commonjs migration:run --dataSource ./ormconfig.js

npx jest --config ./test/jest-e2e.json --detectOpenHandles

sudo docker compose -f ./test/docker-compose.test.yml down --volumes
