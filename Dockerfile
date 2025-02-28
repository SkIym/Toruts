# USED FOR TESTING. 

FROM node


COPY package.json package.json
COPY playwright.config.ts playwright.config.ts
COPY Toruts.sln Toruts.sln

RUN apt install curl
RUN npm i
RUN npx -y playwright install --with-deps chromium

COPY tests /tests

CMD ["npm", "run", "test"]


