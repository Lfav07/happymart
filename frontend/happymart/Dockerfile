
FROM node:18 AS build


WORKDIR /react-docker-example/


COPY package.json package-lock.json ./
COPY public/ ./public
COPY src/ ./src


RUN npm install


RUN npm run build


FROM nginx:alpine


COPY --from=build /react-docker-example/build /usr/share/nginx/html
RUN mv /usr/share/nginx/html/locales/pt-br /usr/share/nginx/html/locales/pt-BR


EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]
