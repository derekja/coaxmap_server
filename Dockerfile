FROM node:10.17.0-buster
EXPOSE 5000

WORKDIR /usr/src/coaxmap_server

# enable repositories and common packages
RUN apt-get update
#RUN echo deb http://archive.ubuntu.com/ubuntu eoan universe multiverse >> /etc/apt/sources.list; apt-get update; apt-get -y install software-properties-common build-essential; apt-get update

# get dependencies
COPY package*.json ./

RUN apt-get -y install libnetcdf-dev

RUN npm install

#bundle app source
COPY . .

CMD [ "node", "server.js" ]

