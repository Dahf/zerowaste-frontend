# Verwenden Sie ein spezifisches Node.js-Image
FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN NODE_ENV=development npm i

COPY . .

RUN npm run build

EXPOSE 5005

CMD ["npm", "run", "dev"]