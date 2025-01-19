import { z } from "zod";

export const UserSchema = z.object({
  name: z.string({ message: "Name is required" }),
  email: z.string().email(),
  password: z.string(),
  createdBy: z.string().optional(),
  updatedBy: z.string().optional(),
  active: z.boolean().optional(),
})

export const UpdateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
  active: z.boolean().optional(),
})

export const UserRouterSchema = z.object({
  userId: z.string()
})