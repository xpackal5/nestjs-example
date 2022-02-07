FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@8.4.1
RUN npm install -g ts-node
RUN npm install -g typeorm
RUN npm i -g @nestjs/cli
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
