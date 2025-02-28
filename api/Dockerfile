FROM  mcr.microsoft.com/dotnet/sdk:9.0

WORKDIR /api
COPY . .
RUN dotnet restore
# ENTRYPOINT ["dotnet", "api.dll"]

# RUN dotnet restore
EXPOSE 5177
ENV ASPNETCORE_URLS=http://0.0.0.0:5177

# CMD [ "ls","-la" ]
ENTRYPOINT ["dotnet", "run"]