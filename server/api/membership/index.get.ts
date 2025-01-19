import { MembershipQuerySchema } from "~/database/Membership"
import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, MembershipQuerySchema.parse)

  try {
    const memberships = await prisma.membership.findMany({
      where: {
        ...query
      },
      orderBy: {
        createdAt: "desc"
      },
      include: {
        user: true
      }
    })

  return {
    status: 200,
    body: {
      message: "Memberships retrieved successfully",
      data: memberships
    }
  }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error retrieving memberships",
      message: (error as Error).message
    }) 
  }
})