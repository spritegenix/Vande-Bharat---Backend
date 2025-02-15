import { z } from 'zod';
import { Page } from './page.schema';
import { ProductCategory } from './category.schema';
import { Tag } from './tags.schema';
import { User } from './user.schema';

// Define Enums Separately
export const OrderStatus = z
  .enum(['PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED'])
  .nullable()
  .optional();
export type OrderStatus = z.infer<typeof OrderStatus>;

// Product Schema
export const Product = z
  .object({
    id: z.string().nullable().optional(),
    name: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    price: z.number().nullable().optional(),
    discountedPrice: z.number().nullable().optional(),
    banners: z.any().nullable().optional(),
    specifications: z.any().nullable().optional(),
    links: z.any().nullable().optional(),

    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional(),
    deletedAt: z.date().nullable().optional(),

    pageId: z.string().nullable().optional(),
    page: z
      .lazy(() => Page.nullable().optional())
      .nullable()
      .optional(),
    categoryId: z.string().nullable().optional(),
    category: z
      .lazy(() => ProductCategory.nullable().optional())
      .nullable()
      .optional(),

    cartItems: z
      .lazy(() => CartItem.array().nullable().optional())
      .nullable()
      .optional(),
    orderItems: z
      .lazy(() => OrderItem.array().nullable().optional())
      .nullable()
      .optional(),
    tags: z
      .lazy(() => Tag.array().nullable().optional())
      .nullable()
      .optional(),
    productHistory: z
      .lazy(() => ProductHistory.array().nullable().optional())
      .nullable()
      .optional(),
  })
  .omit({
    productHistory: true,
  });

// Cart Item Schema
export const CartItem = z
  .object({
    id: z.string().nullable().optional(),
    quantity: z.number().nullable().optional(),

    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional(),
    deletedAt: z.date().nullable().optional(),

    userId: z.string().nullable().optional(),
    user: z
      .lazy(() => User.nullable().optional())
      .nullable()
      .optional(),
    productId: z.string().nullable().optional(),
    product: z
      .lazy(() => Product.nullable().optional())
      .nullable()
      .optional(),
    cartItemHistory: z
      .lazy(() => CartItemHistory.array().nullable().optional())
      .nullable()
      .optional(),
  })
  .omit({
    cartItemHistory: true,
  });

// Order Schema
export const Order = z
  .object({
    id: z.string().nullable().optional(),
    status: OrderStatus.nullable().optional(),
    totalAmount: z.number().nullable().optional(),

    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional(),
    deletedAt: z.date().nullable().optional(),

    userId: z.string().nullable().optional(),
    user: z
      .lazy(() => User.nullable().optional())
      .nullable()
      .optional(),

    orderItems: z
      .lazy(() => OrderItem.array().nullable().optional())
      .nullable()
      .optional(),
    orderHistory: z
      .lazy(() => OrderHistory.array().nullable().optional())
      .nullable()
      .optional(),
  })
  .omit({
    orderHistory: true,
  });

// Order Item Schema
export const OrderItem = z
  .object({
    id: z.string().nullable().optional(),
    quantity: z.number().nullable().optional(),
    price: z.number().nullable().optional(),

    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional(),
    deletedAt: z.date().nullable().optional(),

    orderId: z.string().nullable().optional(),
    order: z
      .lazy(() => Order.nullable().optional())
      .nullable()
      .optional(),
    productId: z.string().nullable().optional(),
    product: z
      .lazy(() => Product.nullable().optional())
      .nullable()
      .optional(),
    orderItemHistory: z
      .lazy(() => OrderItemHistory.array().nullable().optional())
      .nullable()
      .optional(),
  })
  .omit({
    orderItemHistory: true,
  });

// Product History Schema
export const ProductHistory = z.object({
  id: z.string().nullable().optional(),
  productId: z.string().nullable().optional(),
  name: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  price: z.number().nullable().optional(),
  discountedPrice: z.number().nullable().optional(),
  banners: z.any().nullable().optional(),
  specifications: z.any().nullable().optional(),
  links: z.any().nullable().optional(),

  createdAt: z.date().nullable().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),

  pageId: z.string().nullable().optional(),
  categoryId: z.string().nullable().optional(),

  product: z
    .lazy(() => Product.nullable().optional())
    .nullable()
    .optional(),
});

// Cart Item History Schema
export const CartItemHistory = z.object({
  id: z.string().nullable().optional(),
  cartItemId: z.string().nullable().optional(),
  quantity: z.number().nullable().optional(),

  createdAt: z.date().nullable().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),

  userId: z.string().nullable().optional(),
  productId: z.string().nullable().optional(),

  cartItem: z
    .lazy(() => CartItem.nullable().optional())
    .nullable()
    .optional(),
});

// Order History Schema
export const OrderHistory = z.object({
  id: z.string().nullable().optional(),
  orderId: z.string().nullable().optional(),
  status: OrderStatus.nullable().optional(),
  totalAmount: z.number().nullable().optional(),

  createdAt: z.date().nullable().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),

  userId: z.string().nullable().optional(),

  order: z
    .lazy(() => Order.nullable().optional())
    .nullable()
    .optional(),
});

// Order Item History Schema
export const OrderItemHistory = z.object({
  id: z.string().nullable().optional(),
  orderItemId: z.string().nullable().optional(),
  quantity: z.number().nullable().optional(),
  price: z.number().nullable().optional(),

  createdAt: z.date().nullable().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),

  orderId: z.string().nullable().optional(),
  productId: z.string().nullable().optional(),

  orderItem: z
    .lazy(() => OrderItem.nullable().optional())
    .nullable()
    .optional(),
});

// Define types based on schemas
export type Product = z.infer<typeof Product>;
export type CartItem = z.infer<typeof CartItem>;
export type Order = z.infer<typeof Order>;
export type OrderItem = z.infer<typeof OrderItem>;
export type ProductHistory = z.infer<typeof ProductHistory>;
export type CartItemHistory = z.infer<typeof CartItemHistory>;
export type OrderHistory = z.infer<typeof OrderHistory>;
export type OrderItemHistory = z.infer<typeof OrderItemHistory>;
