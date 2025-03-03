FROM node:23-alpine as build

WORKDIR /app
COPY package.json .


RUN npm i
COPY . . 
RUN npm run build

FROM node:23-alpine as prod
# FROM gcr.io/distroless/nodejs22-debian12
COPY --from=build /app/dist/ serve/

ENV PORT=5173
EXPOSE 5173

RUN npm i -g serve
ENTRYPOINT ["serve", "-s", "serve"]


#
# ENTRYPOINT [ "npm", "run", "dev" ]
