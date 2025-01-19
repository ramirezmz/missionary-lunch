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

  try {
    await prisma.user.delete({
      where: {
        id: userId
      }
    })

    return {
      status: 200,
      body: {
        message: "User deleted successfully"
      }
    }
  } catch (error: unknown) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error deleting user",
      message: (error as Error).message
    })
  }
})