FROM node
COPY . .
WORKDIR web

RUN npm i
EXPOSE 5173

CMD [ "yarn", "run", "dev" ]