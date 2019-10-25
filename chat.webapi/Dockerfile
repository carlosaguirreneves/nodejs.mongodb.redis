FROM node
LABEL maintainer CIPA

COPY . /var/tmp/app
WORKDIR /var/tmp/app

RUN npm install && npm install typescript -g && npm install pm2 -g && tsc
RUN mkdir -p /app
RUN cp -r dist/. /app
RUN cp -r node_modules /app
RUN rm -rf /var/tmp/app

WORKDIR /app
#ENTRYPOINT node main
ENTRYPOINT ["pm2-runtime", "ecosystem.config.js"]