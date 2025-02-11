# Database Schema Documentation

## Overview

This document outlines the database schema, including tables, enums, and relationships.

## Enums

- **DonationStatus**: `PENDING`, `PAID`
- **OrderStatus**: `PENDING`, `PAID`, `SHIPPED`, `DELIVERED`, `CANCELLED`
- **GroupPrivacy**: `PRIVATE`, `PUBLIC`
- **MemberStatus**: `PENDING`, `ACCEPTED`, `REJECTED`
- **NotificationType**: `SYSTEM`, `COMMENT`, `REACTION`, `FOLLOW`, `ORDER_UPDATE`
- **CredentialType**: `EMAIL`, `PHONE`

## Tables

### Addresses

Stores address information.

- `id` (TEXT, Primary Key)
- `order` (INTEGER)
- `street`, `city`, `state`, `country`, `pincode` (TEXT)
- `createdAt`, `updatedAt`, `deletedAt` (TIMESTAMP)
- Foreign Keys: `pageId`, `groupId`, `postId`

### Address Histories

Tracks changes in addresses.

- `id` (TEXT, Primary Key)
- `addressId` (TEXT, Foreign Key)
- `order`, `street`, `city`, `state`, `country`, `pincode` (TEXT)
- `createdAt`, `updatedAt`, `deletedAt` (TIMESTAMP)

### Admins

Stores admin user data.

- `id` (TEXT, Primary Key)
- `email`, `name`, `avatar` (TEXT)
- `createdAt`, `updatedAt`, `deletedAt` (TIMESTAMP)
- `adminRoleId` (TEXT, Foreign Key)

### Admin Roles

Defines admin roles and permissions.

- `id` (TEXT, Primary Key)
- `name` (TEXT)
- `permissions` (JSONB)
- `createdAt`, `updatedAt`, `deletedAt` (TIMESTAMP)

## Relationships

- `addresses` may link to `pages`, `groups`, or `posts`
- `address_histories` track changes to `addresses`
- `admins` have roles defined in `admin_roles`

This schema provides a structured and normalized approach to data management.
