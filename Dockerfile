FROM ubuntu:latest
LABEL authors="VF"

ENTRYPOINT ["top", "-b"]

FROM node:20.2.0

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma/

COPY .env ./

COPY tsconfig.json ./

RUN npm install

RUN npm install prisma --save-dev

COPY . .

EXPOSE 3306

RUN npx prisma generate

RUN npx prisma migrate

RUN npx prisma db seed

CMD ["npm", "run", "dev"]