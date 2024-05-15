# Verwenden Sie ein spezifisches Node.js-Image
FROM node:19.5.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 5005

CMD ["npm", "run", "dev"]