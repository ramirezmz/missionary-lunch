import { z } from "zod";

export const TeamSchema = z.object({
  name: z.string({ message: "Name is required" }),
  createdBy: z.string().optional(),
  updatedBy: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export const TeamRouterSchema = z.object({
  teamId: z.string()
})

export const UpdateTeamSchema = z.object({
  name: z.string().optional(),
})