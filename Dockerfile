FROM node:latest

WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app

EXPOSE 2000

CMD ["node", "index.js"]