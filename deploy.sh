#!/bin/bash

read -p "Informe o Stage: " stage
read -p "Informe a Branch: " branch

if [ $stage != "hom" ] && [ $stage != "prod" ]
then
    echo "Stage informado inválido."
    exit 1
fi

git checkout . && git checkout $branch && git pull
docker-compose build --build-arg STAGE=$stage chatweb && docker-compose down && docker-compose up -d
sleep 8
docker-compose exec chatweb sh -c "pm2 ls"
docker-compose exec chatweb sh -c "pm2 logs --nostream --lines 200"