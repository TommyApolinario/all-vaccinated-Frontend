FROM node:18-alpine as build-step

run mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install --force

COPY . /app

RUN npm run build --prod

#Segunda etapa

FROM nginx:1.17.1-alpine

COPY --from=build-step /app/dist/argon-design-system-angular /usr/share/nginx/html
RUN rm /etc/nginx/nginx.conf
COPY --from=build-step /app/nginx.conf /etc/nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]