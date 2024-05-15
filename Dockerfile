FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install @rollup/rollup-linux-x64-gnu --save-optional
RUN npm i

COPY . .

EXPOSE 5005

CMD ["npm", "run", "dev"]