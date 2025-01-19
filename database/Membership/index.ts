import { z } from "zod";

export const Role = z.enum(["admin", "member", "invited"]);
export const MembershipSchema = z.object({
  teamId: z.string({ message: "Team ID is required" }),
  userId: z.string({ message: "User ID is required" }),
  role: Role,
  createdBy: z.string().optional(),
  updatedBy: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export const MembershipRouterSchema = z.object({
  membershipId: z.string({ message: "Membership ID is required" })
})

export const MembershipQuerySchema = z.object({
  teamId: z.string().optional(),
  userId: z.string().optional(),
  role: Role.optional(),
})