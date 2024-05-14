# Verwenden Sie ein spezifisches Node.js-Image
FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5005

CMD ["npm", "run", "dev"]