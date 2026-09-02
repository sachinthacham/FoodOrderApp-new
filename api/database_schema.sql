IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [Orders] (
    [Id] uniqueidentifier NOT NULL,
    [UserId] uniqueidentifier NOT NULL,
    [RestaurantId] uniqueidentifier NOT NULL,
    [OrderDateTime] datetime2 NOT NULL,
    [TotalAmount] decimal(18,2) NOT NULL,
    [Status] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Orders] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [Restaurants] (
    [Id] uniqueidentifier NOT NULL,
    [Name] nvarchar(max) NOT NULL,
    [Description] nvarchar(max) NOT NULL,
    [Address] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Restaurants] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [Users] (
    [Id] uniqueidentifier NOT NULL,
    [FirstName] nvarchar(max) NOT NULL,
    [LastName] nvarchar(max) NOT NULL,
    [Email] nvarchar(100) NOT NULL,
    [Password] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Users] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [OrderItems] (
    [Id] uniqueidentifier NOT NULL,
    [OrderId] uniqueidentifier NOT NULL,
    [MenuItemId] uniqueidentifier NOT NULL,
    [Name] nvarchar(max) NOT NULL,
    [Price] decimal(18,2) NOT NULL,
    [Quantity] int NOT NULL,
    CONSTRAINT [PK_OrderItems] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_OrderItems_Orders_OrderId] FOREIGN KEY ([OrderId]) REFERENCES [Orders] ([Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [MenuItems] (
    [Id] uniqueidentifier NOT NULL,
    [Name] nvarchar(max) NOT NULL,
    [Description] nvarchar(max) NOT NULL,
    [Price] decimal(18,2) NOT NULL,
    [RestaurantId] uniqueidentifier NOT NULL,
    CONSTRAINT [PK_MenuItems] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_MenuItems_Restaurants_RestaurantId] FOREIGN KEY ([RestaurantId]) REFERENCES [Restaurants] ([Id]) ON DELETE CASCADE
);
GO

CREATE INDEX [IX_MenuItems_RestaurantId] ON [MenuItems] ([RestaurantId]);
GO

CREATE INDEX [IX_OrderItems_OrderId] ON [OrderItems] ([OrderId]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20251127111725_AddFoodOrderingTables', N'8.0.0');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

DECLARE @var0 sysname;
SELECT @var0 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Users]') AND [c].[name] = N'Email');
IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [Users] DROP CONSTRAINT [' + @var0 + '];');
ALTER TABLE [Users] ALTER COLUMN [Email] nvarchar(max) NOT NULL;
GO

ALTER TABLE [Users] ADD [Role] nvarchar(max) NOT NULL DEFAULT N'';
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20251208050232_InitialCreate', N'8.0.0');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

DECLARE @var1 sysname;
SELECT @var1 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Orders]') AND [c].[name] = N'Status');
IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [Orders] DROP CONSTRAINT [' + @var1 + '];');
ALTER TABLE [Orders] ALTER COLUMN [Status] nvarchar(50) NOT NULL;
GO

ALTER TABLE [Orders] ADD [DeliveryBoyId] uniqueidentifier NULL;
GO

CREATE TABLE [Carts] (
    [Id] uniqueidentifier NOT NULL,
    [UserId] uniqueidentifier NOT NULL,
    [RestaurantId] uniqueidentifier NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_Carts] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [CartItems] (
    [Id] uniqueidentifier NOT NULL,
    [CartId] uniqueidentifier NOT NULL,
    [MenuItemId] uniqueidentifier NOT NULL,
    [MenuItemName] nvarchar(max) NOT NULL,
    [Price] decimal(18,2) NOT NULL,
    [Quantity] int NOT NULL,
    CONSTRAINT [PK_CartItems] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_CartItems_Carts_CartId] FOREIGN KEY ([CartId]) REFERENCES [Carts] ([Id]) ON DELETE CASCADE
);
GO

CREATE INDEX [IX_CartItems_CartId] ON [CartItems] ([CartId]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20251209051933_AddCartTables', N'8.0.0');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20251209134035_updatecartitemscolumn', N'8.0.0');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20251209134138_newcartitemscolumn', N'8.0.0');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

ALTER TABLE [Carts] ADD [TotalAmount] decimal(18,2) NOT NULL DEFAULT 0.0;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20251209155658_changecartcolumns', N'8.0.0');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

ALTER TABLE [Restaurants] ADD [SellerId] uniqueidentifier NULL;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20251209182628_AddSellerIdToRestaurant', N'8.0.0');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [Addresses] (
    [Id] uniqueidentifier NOT NULL,
    [UserId] uniqueidentifier NOT NULL,
    [Label] nvarchar(max) NOT NULL,
    [Street] nvarchar(max) NOT NULL,
    [City] nvarchar(max) NOT NULL,
    [State] nvarchar(max) NOT NULL,
    [ZipCode] nvarchar(max) NOT NULL,
    [Country] nvarchar(max) NOT NULL,
    [IsDefault] bit NOT NULL,
    CONSTRAINT [PK_Addresses] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [Favorites] (
    [Id] uniqueidentifier NOT NULL,
    [UserId] uniqueidentifier NOT NULL,
    [RestaurantId] uniqueidentifier NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_Favorites] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [Reviews] (
    [Id] uniqueidentifier NOT NULL,
    [UserId] uniqueidentifier NOT NULL,
    [RestaurantId] uniqueidentifier NOT NULL,
    [MenuItemId] uniqueidentifier NULL,
    [Rating] int NOT NULL,
    [Comment] nvarchar(max) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_Reviews] PRIMARY KEY ([Id])
);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20260321055816_EnterpriseFeatures', N'8.0.0');
GO

COMMIT;
GO

