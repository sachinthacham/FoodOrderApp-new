# STAGE 1: BUILD (with EF tools)
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Set working directory
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

# Build the solution
RUN dotnet build "FoodOrder.sln" -c Release -o /app/build

# Publish the API project
RUN dotnet publish "FoodOrder.API/FoodOrder.API.csproj" -c Release -o /app/publish

# STAGE 2: RUNTIME
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final

# Set working directory
WORKDIR /app

# Copy published files
COPY --from=build /app/publish .

# Expose port 80
EXPOSE 80

# Command to run when container starts
ENTRYPOINT ["dotnet", "FoodOrder.API.dll"]
