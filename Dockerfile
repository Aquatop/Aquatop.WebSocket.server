FROM node:10

WORKDIR /usr/app
COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3333
CMD ["yarn", "dev"]
