FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY Wordle.Api.sln .
COPY Wordle.Api/Wordle.Api.csproj Wordle.Api/
RUN dotnet restore

COPY . .
RUN dotnet publish Wordle.Api/Wordle.Api.csproj -c Release -o /app/publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

COPY --from=build /app/publish .

EXPOSE 5001
ENTRYPOINT ["dotnet", "Wordle.Api.dll"]
