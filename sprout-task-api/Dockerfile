FROM node:22-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY prisma ./prisma

COPY . .

EXPOSE 8000

CMD ["sh", "-c", "yarn prisma-generate && yarn prisma-migrate && yarn dev"]