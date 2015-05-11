############################################################
# Dockerfile to build Node Installed Containers
# Based on Ubuntu
############################################################

# Set the base image to Ubuntu
FROM node:0.10

# File Author / Maintainer
MAINTAINER Francis Norton

ADD app /usr/src/app

# Set the default command to execute
# when creating a new container
WORKDIR /usr/src/app
RUN npm install
CMD node app.js

# Expose ports
EXPOSE 8000
EXPOSE 8800
