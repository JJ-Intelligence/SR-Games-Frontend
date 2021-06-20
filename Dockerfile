# build environment
FROM node:14.17.1-alpine as build
RUN mkdir /sr-games
WORKDIR /sr-games
ENV PATH /sr-games/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
WORKDIR /sr-games
COPY --from=build /sr-games/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]