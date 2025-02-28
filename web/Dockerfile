FROM node

WORKDIR /app
COPY package.json .

ENV PORT=5173
EXPOSE 5173

RUN npm i

COPY . . 

ENTRYPOINT [ "npm", "run", "dev" ]