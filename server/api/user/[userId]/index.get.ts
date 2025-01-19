import { UserRouterSchema } from "~/database/User"
import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
  const userId = (await getValidatedRouterParams(event, UserRouterSchema.parse)).userId

  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })
  if (!user) {
    throw createError({
      statusCode: 404,
      message: "User not found"
    })
  }

  return {
    status: 200,
    body: {
      message: "User retrieved successfully",
      data: user
    }
  }
})