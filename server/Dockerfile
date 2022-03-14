FROM node:alpine AS base
WORKDIR /app
COPY package.json ./
RUN npm install

FROM base AS local
RUN npm install -g nodemon
COPY . .
CMD ["npm", "run", "dev"]

FROM base AS prod
COPY . .
CMD ["npm", "run", "start"]
