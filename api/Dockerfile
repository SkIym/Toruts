# ---- Frontend build stage ----
FROM node:23-alpine AS frontend-build
WORKDIR /web
COPY web/package*.json ./
RUN npm ci
COPY web .
RUN npm run build  # This moves dist -> ../api/wwwroot as per your script

# ---- Backend build stage ----
FROM mcr.microsoft.com/dotnet/sdk:9.0-alpine AS build
WORKDIR /src
COPY api/*.csproj .
RUN dotnet restore

COPY api .
# frontend build already put files in api/wwwroot, so nothing more to do here
RUN dotnet publish -c Release -o /app

# ---- Runtime stage ----
FROM mcr.microsoft.com/dotnet/aspnet:9.0-alpine AS runtime
WORKDIR /app
COPY --from=build /app .
ENV ASPNETCORE_URLS=http://+:5177
EXPOSE 5177
ENTRYPOINT ["dotnet", "api.dll"]
