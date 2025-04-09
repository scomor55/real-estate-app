FROM node:latest

WORKDIR /real-estate-app-master

RUN curl -o /usr/local/bin/wait-for-it https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && \
    chmod +x /usr/local/bin/wait-for-it

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["wait-for-it", "mysql-db:3306", "--", "sh", "-c", "node initBazu.js && node index.js"]
