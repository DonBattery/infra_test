FROM node

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 3030

CMD [ "npm", "start" ]
