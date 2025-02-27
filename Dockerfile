FROM node as frontend

COPY ./web ./web
WORKDIR /web
RUN npm i
CMD [ "yarn", "run", "dev" ]

# Backend
# FROM mcr.microsoft.com/dotnet/aspnet:8.0 as backend
# COPY . .
# WORKDIR /api

# CMD [ "ls", "-la" ]

# COPY --link *.csproj .
# RUN dotnet restore

# CMD [ "ls", "-la" ]
