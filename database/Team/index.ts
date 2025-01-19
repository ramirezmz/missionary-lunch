import { z } from "zod";

export const TeamSchema = z.object({
  name: z.string({ message: "Name is required" }),
  createdBy: z.string().optional(),
  updatedBy: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})