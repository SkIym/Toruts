FROM  mcr.microsoft.com/dotnet/sdk:9.0

WORKDIR /api
COPY . .
RUN dotnet restore
ENV ASPNETCORE_URLS=http://0.0.0.0:5177

EXPOSE 5177

ENTRYPOINT ["dotnet", "run"]