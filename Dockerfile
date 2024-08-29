FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm rebuild sqlite3

CMD ["npm", "run", "start:prod"]
