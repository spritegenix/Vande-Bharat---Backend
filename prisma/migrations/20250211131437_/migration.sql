-- CreateEnum
CREATE TYPE "DonationStatus" AS ENUM ('PENDING', 'PAID');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "GroupPrivacy" AS ENUM ('PRIVATE', 'PUBLIC');

-- CreateEnum
CREATE TYPE "MemberStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('SYSTEM', 'COMMENT', 'REACTION', 'FOLLOW', 'ORDER_UPDATE');

-- CreateEnum
CREATE TYPE "CredentialType" AS ENUM ('EMAIL', 'PHONE');

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "order" INTEGER,
    "street" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "pincode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "pageId" TEXT,
    "groupId" TEXT,
    "postId" TEXT,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address_histories" (
    "id" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,
    "order" INTEGER,
    "street" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "pincode" TEXT,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "address_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "adminRoleId" TEXT NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_roles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "permissions" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "admin_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_histories" (
    "id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "email" TEXT,
    "name" TEXT,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "admin_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_role_histories" (
    "id" TEXT NOT NULL,
    "adminRoleId" TEXT NOT NULL,
    "name" TEXT,
    "permissions" JSONB,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "admin_role_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "slug" TEXT,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "parentId" TEXT,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_categories" (
    "id" TEXT NOT NULL,
    "slug" TEXT,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "parentId" TEXT,

    CONSTRAINT "product_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category_histories" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "slug" TEXT,
    "name" TEXT,
    "icon" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "parentId" TEXT,

    CONSTRAINT "category_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_category_histories" (
    "id" TEXT NOT NULL,
    "productCategoryId" TEXT NOT NULL,
    "slug" TEXT,
    "name" TEXT,
    "icon" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "parentId" TEXT,

    CONSTRAINT "product_category_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "donations" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "description" JSONB,
    "status" "DonationStatus" NOT NULL DEFAULT 'PENDING',
    "razorpayId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,

    CONSTRAINT "donations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "donation_histories" (
    "id" TEXT NOT NULL,
    "donationId" TEXT NOT NULL,
    "amount" DECIMAL(65,30),
    "description" JSONB,
    "status" TEXT,
    "razorpayId" TEXT,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT,
    "pageId" TEXT,

    CONSTRAINT "donation_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "discountedPrice" DECIMAL(10,2),
    "banners" JSONB,
    "specifications" JSONB,
    "links" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "pageId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart_items" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "cart_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "totalAmount" DECIMAL(10,2) NOT NULL,
    "razorpayId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_histories" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "price" DECIMAL(65,30),
    "discountedPrice" DECIMAL(65,30),
    "banners" JSONB,
    "specifications" JSONB,
    "links" JSONB,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "pageId" TEXT,
    "categoryId" TEXT,

    CONSTRAINT "product_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart_item_histories" (
    "id" TEXT NOT NULL,
    "cartItemId" TEXT NOT NULL,
    "quantity" INTEGER,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT,
    "productId" TEXT,

    CONSTRAINT "cart_item_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_histories" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "status" TEXT,
    "totalAmount" DECIMAL(65,30),
    "razorpayId" TEXT,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT,

    CONSTRAINT "order_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_item_histories" (
    "id" TEXT NOT NULL,
    "orderItemId" TEXT NOT NULL,
    "quantity" INTEGER,
    "price" DECIMAL(65,30),
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "orderId" TEXT,
    "productId" TEXT,

    CONSTRAINT "order_item_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groups" (
    "id" TEXT NOT NULL,
    "slug" TEXT,
    "name" TEXT NOT NULL,
    "description" JSONB,
    "privacy" "GroupPrivacy" NOT NULL DEFAULT 'PUBLIC',
    "isHidden" BOOLEAN NOT NULL DEFAULT false,
    "banner" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "ownerId" TEXT NOT NULL,
    "categoryId" TEXT,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group_members" (
    "id" TEXT NOT NULL,
    "status" "MemberStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,

    CONSTRAINT "group_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group_histories" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "slug" TEXT,
    "name" TEXT,
    "description" JSONB,
    "privacy" TEXT,
    "banner" TEXT,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "ownerId" TEXT,
    "categoryId" TEXT,

    CONSTRAINT "group_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group_member_histories" (
    "id" TEXT NOT NULL,
    "groupMemberId" TEXT NOT NULL,
    "status" TEXT,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT,
    "groupId" TEXT,

    CONSTRAINT "group_member_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "message" TEXT NOT NULL,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification_histories" (
    "id" TEXT NOT NULL,
    "notificationId" TEXT NOT NULL,
    "type" TEXT,
    "message" TEXT,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT,

    CONSTRAINT "notification_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pages" (
    "id" TEXT NOT NULL,
    "slug" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "banner" TEXT,
    "avatar" TEXT,
    "pageContactDetails" JSONB,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "isHidden" BOOLEAN NOT NULL DEFAULT false,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "page_followers" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,

    CONSTRAINT "page_followers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "page_histories" (
    "id" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "slug" TEXT,
    "name" TEXT,
    "description" TEXT,
    "banner" TEXT,
    "avatar" TEXT,
    "pageContactDetails" JSONB,
    "isDefault" BOOLEAN,
    "idHidden" BOOLEAN,
    "isBlocked" BOOLEAN,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "ownerId" TEXT,

    CONSTRAINT "page_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "page_follower_histories" (
    "id" TEXT NOT NULL,
    "pageFollowerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT,
    "pageId" TEXT,

    CONSTRAINT "page_follower_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "text" TEXT,
    "media" JSONB,
    "isPinned" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "groupId" TEXT,
    "pageId" TEXT,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "text" TEXT,
    "media" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "authorId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "parentId" TEXT,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reactions" (
    "id" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "postId" TEXT,
    "commentId" TEXT,

    CONSTRAINT "reactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookmarks" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "bookmarks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_histories" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "text" TEXT,
    "media" JSONB,
    "isPinned" BOOLEAN,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "groupId" TEXT,
    "pageId" TEXT,

    CONSTRAINT "post_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment_histories" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "text" TEXT,
    "media" JSONB,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "authorId" TEXT,
    "postId" TEXT,
    "parentId" TEXT,

    CONSTRAINT "comment_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reaction_histories" (
    "id" TEXT NOT NULL,
    "reactionId" TEXT NOT NULL,
    "emoji" TEXT,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT,
    "postId" TEXT,
    "commentId" TEXT,

    CONSTRAINT "reaction_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookmarks_histories" (
    "id" TEXT NOT NULL,
    "bookmarkId" TEXT NOT NULL,
    "userId" TEXT,
    "postId" TEXT,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "bookmarks_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reports" (
    "id" TEXT NOT NULL,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "reportTypeId" TEXT,
    "userId" TEXT,
    "pageId" TEXT,
    "groupId" TEXT,
    "postId" TEXT,
    "commentId" TEXT,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reportTypes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "reportTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_histories" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "message" TEXT,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "reportTypeId" TEXT,
    "userId" TEXT,
    "pageId" TEXT,
    "groupId" TEXT,
    "postId" TEXT,
    "commentId" TEXT,

    CONSTRAINT "report_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_types_histories" (
    "id" TEXT NOT NULL,
    "reportTypeId" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "report_types_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag_histories" (
    "id" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "tag_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "hash" TEXT,
    "isHidden" BOOLEAN NOT NULL DEFAULT false,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ip_addresses" (
    "id" TEXT NOT NULL,
    "ipV4" TEXT,
    "ipV6" TEXT,
    "time" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "ip_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "credentials" (
    "id" TEXT NOT NULL,
    "type" "CredentialType" NOT NULL,
    "value" TEXT NOT NULL,
    "isVerified" BOOLEAN DEFAULT false,
    "isPrimary" BOOLEAN DEFAULT false,
    "verifiedAt" TIMESTAMP(3),
    "order" INTEGER,
    "otp" TEXT,
    "otpExpiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "credentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_histories" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "hash" TEXT,
    "salt" TEXT,
    "isHidden" BOOLEAN,
    "isBlocked" BOOLEAN,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "user_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ip_address_histories" (
    "id" TEXT NOT NULL,
    "ipAddressId" TEXT NOT NULL,
    "ipV4" TEXT,
    "ipV6" TEXT,
    "timestamp" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT,

    CONSTRAINT "ip_address_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "credential_histories" (
    "id" TEXT NOT NULL,
    "credentialId" TEXT NOT NULL,
    "type" TEXT,
    "value" TEXT,
    "isVerified" BOOLEAN,
    "isPrimary" BOOLEAN,
    "verifiedAt" TIMESTAMP(3),
    "order" INTEGER,
    "otp" TEXT,
    "otpExpiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT,

    CONSTRAINT "credential_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToPage" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CategoryToPage_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ProductToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProductToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_GroupToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_GroupToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_PageToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PageToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_PostToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PostToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CommentToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CommentToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "addresses_postId_key" ON "addresses"("postId");

-- CreateIndex
CREATE INDEX "addresses_pageId_idx" ON "addresses"("pageId");

-- CreateIndex
CREATE INDEX "addresses_groupId_idx" ON "addresses"("groupId");

-- CreateIndex
CREATE INDEX "addresses_postId_idx" ON "addresses"("postId");

-- CreateIndex
CREATE INDEX "address_histories_addressId_idx" ON "address_histories"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE INDEX "admin_histories_adminId_idx" ON "admin_histories"("adminId");

-- CreateIndex
CREATE INDEX "admin_role_histories_adminRoleId_idx" ON "admin_role_histories"("adminRoleId");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- CreateIndex
CREATE INDEX "categories_parentId_idx" ON "categories"("parentId");

-- CreateIndex
CREATE UNIQUE INDEX "product_categories_slug_key" ON "product_categories"("slug");

-- CreateIndex
CREATE INDEX "product_categories_parentId_idx" ON "product_categories"("parentId");

-- CreateIndex
CREATE INDEX "category_histories_categoryId_idx" ON "category_histories"("categoryId");

-- CreateIndex
CREATE INDEX "product_category_histories_productCategoryId_idx" ON "product_category_histories"("productCategoryId");

-- CreateIndex
CREATE UNIQUE INDEX "donations_razorpayId_key" ON "donations"("razorpayId");

-- CreateIndex
CREATE INDEX "donations_userId_idx" ON "donations"("userId");

-- CreateIndex
CREATE INDEX "donations_pageId_idx" ON "donations"("pageId");

-- CreateIndex
CREATE INDEX "donation_histories_donationId_idx" ON "donation_histories"("donationId");

-- CreateIndex
CREATE INDEX "products_pageId_idx" ON "products"("pageId");

-- CreateIndex
CREATE INDEX "products_categoryId_idx" ON "products"("categoryId");

-- CreateIndex
CREATE INDEX "cart_items_userId_idx" ON "cart_items"("userId");

-- CreateIndex
CREATE INDEX "cart_items_productId_idx" ON "cart_items"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "cart_items_userId_productId_key" ON "cart_items"("userId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "orders_razorpayId_key" ON "orders"("razorpayId");

-- CreateIndex
CREATE INDEX "orders_userId_idx" ON "orders"("userId");

-- CreateIndex
CREATE INDEX "order_items_orderId_idx" ON "order_items"("orderId");

-- CreateIndex
CREATE INDEX "order_items_productId_idx" ON "order_items"("productId");

-- CreateIndex
CREATE INDEX "product_histories_productId_idx" ON "product_histories"("productId");

-- CreateIndex
CREATE INDEX "cart_item_histories_cartItemId_idx" ON "cart_item_histories"("cartItemId");

-- CreateIndex
CREATE INDEX "order_histories_orderId_idx" ON "order_histories"("orderId");

-- CreateIndex
CREATE INDEX "order_item_histories_orderItemId_idx" ON "order_item_histories"("orderItemId");

-- CreateIndex
CREATE UNIQUE INDEX "groups_slug_key" ON "groups"("slug");

-- CreateIndex
CREATE INDEX "groups_ownerId_idx" ON "groups"("ownerId");

-- CreateIndex
CREATE INDEX "group_members_userId_idx" ON "group_members"("userId");

-- CreateIndex
CREATE INDEX "group_members_groupId_idx" ON "group_members"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "group_members_userId_groupId_key" ON "group_members"("userId", "groupId");

-- CreateIndex
CREATE INDEX "group_histories_groupId_idx" ON "group_histories"("groupId");

-- CreateIndex
CREATE INDEX "group_member_histories_groupMemberId_idx" ON "group_member_histories"("groupMemberId");

-- CreateIndex
CREATE INDEX "notifications_userId_idx" ON "notifications"("userId");

-- CreateIndex
CREATE INDEX "notification_histories_notificationId_idx" ON "notification_histories"("notificationId");

-- CreateIndex
CREATE UNIQUE INDEX "pages_slug_key" ON "pages"("slug");

-- CreateIndex
CREATE INDEX "pages_ownerId_idx" ON "pages"("ownerId");

-- CreateIndex
CREATE INDEX "page_followers_userId_idx" ON "page_followers"("userId");

-- CreateIndex
CREATE INDEX "page_followers_pageId_idx" ON "page_followers"("pageId");

-- CreateIndex
CREATE UNIQUE INDEX "page_followers_userId_pageId_key" ON "page_followers"("userId", "pageId");

-- CreateIndex
CREATE INDEX "page_histories_pageId_idx" ON "page_histories"("pageId");

-- CreateIndex
CREATE INDEX "page_follower_histories_pageFollowerId_idx" ON "page_follower_histories"("pageFollowerId");

-- CreateIndex
CREATE INDEX "posts_groupId_idx" ON "posts"("groupId");

-- CreateIndex
CREATE INDEX "posts_pageId_idx" ON "posts"("pageId");

-- CreateIndex
CREATE INDEX "comments_authorId_idx" ON "comments"("authorId");

-- CreateIndex
CREATE INDEX "comments_postId_idx" ON "comments"("postId");

-- CreateIndex
CREATE INDEX "comments_parentId_idx" ON "comments"("parentId");

-- CreateIndex
CREATE INDEX "reactions_userId_idx" ON "reactions"("userId");

-- CreateIndex
CREATE INDEX "reactions_postId_idx" ON "reactions"("postId");

-- CreateIndex
CREATE INDEX "reactions_commentId_idx" ON "reactions"("commentId");

-- CreateIndex
CREATE UNIQUE INDEX "reactions_userId_postId_commentId_key" ON "reactions"("userId", "postId", "commentId");

-- CreateIndex
CREATE UNIQUE INDEX "bookmarks_userId_postId_key" ON "bookmarks"("userId", "postId");

-- CreateIndex
CREATE INDEX "post_histories_postId_idx" ON "post_histories"("postId");

-- CreateIndex
CREATE INDEX "comment_histories_commentId_idx" ON "comment_histories"("commentId");

-- CreateIndex
CREATE INDEX "reaction_histories_reactionId_idx" ON "reaction_histories"("reactionId");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- CreateIndex
CREATE INDEX "ip_addresses_userId_idx" ON "ip_addresses"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "credentials_value_key" ON "credentials"("value");

-- CreateIndex
CREATE INDEX "credentials_userId_idx" ON "credentials"("userId");

-- CreateIndex
CREATE INDEX "_CategoryToPage_B_index" ON "_CategoryToPage"("B");

-- CreateIndex
CREATE INDEX "_ProductToTag_B_index" ON "_ProductToTag"("B");

-- CreateIndex
CREATE INDEX "_GroupToTag_B_index" ON "_GroupToTag"("B");

-- CreateIndex
CREATE INDEX "_PageToTag_B_index" ON "_PageToTag"("B");

-- CreateIndex
CREATE INDEX "_PostToTag_B_index" ON "_PostToTag"("B");

-- CreateIndex
CREATE INDEX "_CommentToTag_B_index" ON "_CommentToTag"("B");

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "pages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address_histories" ADD CONSTRAINT "address_histories_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_adminRoleId_fkey" FOREIGN KEY ("adminRoleId") REFERENCES "admin_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_histories" ADD CONSTRAINT "admin_histories_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_role_histories" ADD CONSTRAINT "admin_role_histories_adminRoleId_fkey" FOREIGN KEY ("adminRoleId") REFERENCES "admin_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "product_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_histories" ADD CONSTRAINT "category_histories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_category_histories" ADD CONSTRAINT "product_category_histories_productCategoryId_fkey" FOREIGN KEY ("productCategoryId") REFERENCES "product_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "pages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donation_histories" ADD CONSTRAINT "donation_histories_donationId_fkey" FOREIGN KEY ("donationId") REFERENCES "donations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "pages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "product_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_histories" ADD CONSTRAINT "product_histories_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_item_histories" ADD CONSTRAINT "cart_item_histories_cartItemId_fkey" FOREIGN KEY ("cartItemId") REFERENCES "cart_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_histories" ADD CONSTRAINT "order_histories_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item_histories" ADD CONSTRAINT "order_item_histories_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "order_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_members" ADD CONSTRAINT "group_members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_members" ADD CONSTRAINT "group_members_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_histories" ADD CONSTRAINT "group_histories_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_member_histories" ADD CONSTRAINT "group_member_histories_groupMemberId_fkey" FOREIGN KEY ("groupMemberId") REFERENCES "group_members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_histories" ADD CONSTRAINT "notification_histories_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "notifications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pages" ADD CONSTRAINT "pages_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "page_followers" ADD CONSTRAINT "page_followers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "page_followers" ADD CONSTRAINT "page_followers_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "pages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "page_histories" ADD CONSTRAINT "page_histories_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "pages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "page_follower_histories" ADD CONSTRAINT "page_follower_histories_pageFollowerId_fkey" FOREIGN KEY ("pageFollowerId") REFERENCES "page_followers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "pages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reactions" ADD CONSTRAINT "reactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reactions" ADD CONSTRAINT "reactions_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reactions" ADD CONSTRAINT "reactions_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_histories" ADD CONSTRAINT "post_histories_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_histories" ADD CONSTRAINT "comment_histories_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reaction_histories" ADD CONSTRAINT "reaction_histories_reactionId_fkey" FOREIGN KEY ("reactionId") REFERENCES "reactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookmarks_histories" ADD CONSTRAINT "bookmarks_histories_bookmarkId_fkey" FOREIGN KEY ("bookmarkId") REFERENCES "bookmarks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_reportTypeId_fkey" FOREIGN KEY ("reportTypeId") REFERENCES "reportTypes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "pages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_histories" ADD CONSTRAINT "report_histories_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "reports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_types_histories" ADD CONSTRAINT "report_types_histories_reportTypeId_fkey" FOREIGN KEY ("reportTypeId") REFERENCES "reportTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_histories" ADD CONSTRAINT "tag_histories_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ip_addresses" ADD CONSTRAINT "ip_addresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credentials" ADD CONSTRAINT "credentials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_histories" ADD CONSTRAINT "user_histories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ip_address_histories" ADD CONSTRAINT "ip_address_histories_ipAddressId_fkey" FOREIGN KEY ("ipAddressId") REFERENCES "ip_addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credential_histories" ADD CONSTRAINT "credential_histories_credentialId_fkey" FOREIGN KEY ("credentialId") REFERENCES "credentials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToPage" ADD CONSTRAINT "_CategoryToPage_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToPage" ADD CONSTRAINT "_CategoryToPage_B_fkey" FOREIGN KEY ("B") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToTag" ADD CONSTRAINT "_ProductToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToTag" ADD CONSTRAINT "_ProductToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToTag" ADD CONSTRAINT "_GroupToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToTag" ADD CONSTRAINT "_GroupToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PageToTag" ADD CONSTRAINT "_PageToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PageToTag" ADD CONSTRAINT "_PageToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommentToTag" ADD CONSTRAINT "_CommentToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommentToTag" ADD CONSTRAINT "_CommentToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
