############################################################
# Dockerfile to build Node Installed Containers
# Based on Ubuntu
############################################################

# Set the base image to Ubuntu
FROM node:latest

# File Author / Maintainer
MAINTAINER Francis Norton

ADD app /usr/src/app

# Expose ports
EXPOSE 8000

# Set the default command to execute
# when creating a new container
WORKDIR /usr/src/app
RUN npm install
CMD node app.js
