FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package.json .
RUN apk update && apk add yarn
RUN yarn install
COPY . .
RUN yarn build

#  THINGS HAPPEN FROM NGINX IMAGE
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build-stage /app/build .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
 
# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx.conf /etc/nginx/conf.d/default.conf
