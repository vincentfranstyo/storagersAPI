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

EXPOSE 3310

RUN ["chmod", "+x", "./wait-for-mysql.sh"]

RUN npx prisma generate

RUN /bin/bash -c "./wait-for-mysql.sh && npx prisma migrate && npx prisma db seed"

CMD ["npm", "run", "dev"]