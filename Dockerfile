FROM node:9.3-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production
COPY . .
CMD [ "npm", "start" ]
