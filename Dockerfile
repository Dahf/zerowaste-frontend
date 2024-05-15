FROM node:18.18.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 5005

CMD ["npm", "run", "dev"]