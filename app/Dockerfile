FROM node:12

WORKDIR /usr/src/app

COPY . .

ARG ENV

RUN npm install
RUN npm run build

EXPOSE 3001

ENV NODE_ENV=$ENV
ENV NODE_PATH=dist

CMD ["node", "dist/index.js"]