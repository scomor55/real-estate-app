FROM node:latest

WORKDIR /real-estate-app-master

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "node initBazu.js && node index.js"]
