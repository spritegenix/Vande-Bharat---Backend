import { z } from 'zod';

export const Admin = z
  .object({
    id: z.string().nullable().optional(),
    email: z.string().email().nullable().optional(),
    name: z.string().nullable().optional(),
    avatar: z.string().nullable().optional(),

    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional(),
    deletedAt: z.date().nullable().optional(),

    role: z
      .lazy(() => AdminRole)
      .nullable()
      .optional(), // Lazy reference
    adminRoleId: z.string().nullable().optional(),
    adminHistory: z
      .lazy(() => AdminHistory.array().nullable().optional())
      .nullable()
      .optional(), // Lazy reference
  })
  .omit({
    adminHistory: true,
  })
  .nullable()
  .optional();

export const AdminRole = z
  .object({
    id: z.string().nullable().optional(),
    name: z.string().nullable().optional(),
    permissions: z.any().nullable().optional(),

    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional(),
    deletedAt: z.date().nullable().optional(),

    admins: z
      .lazy(() => Admin.array().nullable().optional())
      .nullable()
      .optional(), // Lazy reference
    adminRoleHistory: z
      .lazy(() => AdminRoleHistory.array().nullable().optional())
      .nullable()
      .optional(), // Lazy reference
  })
  .omit({
    adminRoleHistory: true,
  })
  .nullable()
  .optional();

export const AdminHistory = z
  .object({
    id: z.string().nullable().optional(),
    adminId: z.string().nullable().optional(),
    email: z.string().email().nullable().optional(),
    name: z.string().nullable().optional(),
    avatar: z.string().nullable().optional(),

    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional(),
    deletedAt: z.date().nullable().optional(),

    admin: z
      .lazy(() => Admin.nullable().optional())
      .nullable()
      .optional(), // Lazy reference
  })
  .nullable()
  .optional();

export const AdminRoleHistory = z
  .object({
    id: z.string().nullable().optional(),
    adminRoleId: z.string().nullable().optional(),
    name: z.string().nullable().optional(),
    permissions: z.any().nullable().optional(),

    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional(),
    deletedAt: z.date().nullable().optional(),

    adminRole: z
      .lazy(() => AdminRole.nullable().optional())
      .nullable()
      .optional(), // Lazy reference
  })
  .nullable()
  .optional();

// Define types correctly
export type AdminRole = z.infer<typeof AdminRole>;
export type AdminRoleHistory = z.infer<typeof AdminRoleHistory>;
export type AdminHistory = z.infer<typeof AdminHistory>;
export type Admin = z.infer<typeof Admin>;
