#!/bin/bash

export $(grep -v '^#' .env | xargs)

mkdir -p dist/php

cp -r src/php dist
cp src/.htaccess dist/

sed "s|{{DB_HOST}}|${DB_HOST}|g; s|{{DB_USERNAME}}|${DB_USERNAME}|g; s|{{DB_PASSWORD}}|${DB_PASSWORD}|g; s|{{DB_NAME}}|${DB_NAME}|g" src/php/Database.php > dist/php/Database.php

sed "s|{{BASE_SERVER_URL}}|${BASE_SERVER_URL}|g" dist/.htaccess > dist/.htaccess.tmp && mv dist/.htaccess.tmp dist/.htaccess

echo "Building completed successfully."
