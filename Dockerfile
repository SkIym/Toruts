FROM node as front

COPY . .
RUN npm i
CMD [ "yarn", "run", "dev" ]