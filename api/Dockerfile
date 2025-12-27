# STAGE 1: BUILD
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

# Copy solution file
COPY ["FoodOrder.sln", "./"]

# Copy all .csproj files
COPY ["FoodOrder.API/FoodOrder.API.csproj", "FoodOrder.API/"]
COPY ["FoodOrder.Application/FoodOrder.Application.csproj", "FoodOrder.Application/"]
COPY ["FoodOrder.Domain/FoodOrder.Domain.csproj", "FoodOrder.Domain/"]
COPY ["FoodOrder.Infrastructure/FoodOrder.Infrastructure.csproj", "FoodOrder.Infrastructure/"]

# Restore NuGet packages
RUN dotnet restore "FoodOrder.sln"

# Copy everything else
COPY . .

# Build and Publish
RUN dotnet build "FoodOrder.sln" -c Release -o /app/build
RUN dotnet publish "FoodOrder.API/FoodOrder.API.csproj" -c Release -o /app/publish

# STAGE 2: RUNTIME
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final

WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 8080

ENTRYPOINT ["dotnet", "FoodOrder.API.dll"]