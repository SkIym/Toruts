# USED FOR TESTING. 

# FROM node

# COPY package.json package.json
# COPY playwright.config.ts playwright.config.ts
# COPY Toruts.sln Toruts.sln

# RUN apt install curl
# RUN npm i
# RUN npx -y playwright install --with-deps chromium

# COPY tests /tests

# EXPOSE 9000

# CMD ["npm", "run", "test"]

FROM mcr.microsoft.com/playwright:v1.50.1-noble

WORKDIR /tests

COPY package.json package.json
COPY playwright.config.ts playwright.config.ts
COPY Toruts.sln Toruts.sln
COPY tests /tests

RUN npm i

CMD [ "npx", "playwright",  "test" ]
