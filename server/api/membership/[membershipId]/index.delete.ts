import { MembershipRouterSchema } from "~/database/Membership"
import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
  const membershipId = (await getValidatedRouterParams(event, MembershipRouterSchema.parse)).membershipId

  const membership = await prisma.membership.findUnique({
    where: {
      id: membershipId
    }
  })
  if (!membership) {
    throw createError({
      statusCode: 404,
      message: "Membership not found"
    })
  }

  try {
    await prisma.membership.delete({
      where: {
        id: membershipId
      }
    })

    return {
      status: 200,
      body: {
        message: "Membership deleted successfully",
        data: membership
      }
    }
  } catch (error: unknown) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error deleting membership",
      message: (error as Error).message
    })
  }
})