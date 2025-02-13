import { z } from 'zod';
import { Page } from './page.schema';
import { Group } from './group.schema';
import { Product } from './ecommerce.schema';

// Category Schema
export const Category = z
  .object({
    id: z.string().nullable().optional(),
    slug: z.string().nullable().optional(),
    name: z.string().nullable().optional(),
    icon: z.string().nullable().optional(),
    description: z.string().nullable().optional(),

    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional(),
    deletedAt: z.date().nullable().optional(),

    parentId: z.string().nullable().optional(),
    parent: z
      .lazy(() => Category.nullable().optional())
      .nullable()
      .optional(),

    children: z
      .lazy(() => Category.array().nullable().optional())
      .nullable()
      .optional(),
    pages: z
      .lazy(() => Page.array().nullable().optional())
      .nullable()
      .optional(),
    groups: z
      .lazy(() => Group.array().nullable().optional())
      .nullable()
      .optional(),
    categoryHistory: z
      .lazy(() => CategoryHistory.array().nullable().optional())
      .nullable()
      .optional(),
  })
  .omit({
    categoryHistory: true,
  })
  .nullable()
  .optional();

// Product Category Schema
export const ProductCategory = z
  .object({
    id: z.string().nullable().optional(),
    slug: z.string().nullable().optional(),
    name: z.string().nullable().optional(),
    icon: z.string().nullable().optional(),
    description: z.string().nullable().optional(),

    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional(),
    deletedAt: z.date().nullable().optional(),

    parentId: z.string().nullable().optional(),
    parent: z
      .lazy(() => ProductCategory.nullable().optional())
      .nullable()
      .optional(),

    children: z
      .lazy(() => ProductCategory.array().nullable().optional())
      .nullable()
      .optional(),
    products: z
      .lazy(() => Product.array().nullable().optional())
      .nullable()
      .optional(),
    productCategoryHistory: z
      .lazy(() => ProductCategoryHistory.array().nullable().optional())
      .nullable()
      .optional(),
  })
  .omit({
    productCategoryHistory: true,
  })
  .nullable()
  .optional();

// Category History Schema
export const CategoryHistory = z
  .object({
    id: z.string().nullable().optional(),
    categoryId: z.string().nullable().optional(),
    slug: z.string().nullable().optional(),
    name: z.string().nullable().optional(),
    icon: z.string().nullable().optional(),
    description: z.string().nullable().optional(),

    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional(),
    deletedAt: z.date().nullable().optional(),

    parentId: z.string().nullable().optional(),

    category: z
      .lazy(() => Category.nullable().optional())
      .nullable()
      .optional(),
  })
  .nullable()
  .optional();

// Product Category History Schema
export const ProductCategoryHistory = z
  .object({
    id: z.string().nullable().optional(),
    productCategoryId: z.string().nullable().optional(),
    slug: z.string().nullable().optional(),
    name: z.string().nullable().optional(),
    icon: z.string().nullable().optional(),
    description: z.string().nullable().optional(),

    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional(),
    deletedAt: z.date().nullable().optional(),

    parentId: z.string().nullable().optional(),

    productCategory: z
      .lazy(() => ProductCategory.nullable().optional())
      .nullable()
      .optional(),
  })
  .nullable()
  .optional();

// Define types based on schemas
export type Category = z.infer<typeof Category>;
export type ProductCategory = z.infer<typeof ProductCategory>;
export type CategoryHistory = z.infer<typeof CategoryHistory>;
export type ProductCategoryHistory = z.infer<typeof ProductCategoryHistory>;
