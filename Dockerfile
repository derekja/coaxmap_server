FROM node:10
EXPOSE 5000

WORKDIR /usr/src/coaxmap_server

# get dependencies
COPY package*.json ./

RUN sudo apt-get -y install libnetcdf-dev

RUN npm install

#bundle app source
COPY . .

CMD [ "node", "server.js" ]

