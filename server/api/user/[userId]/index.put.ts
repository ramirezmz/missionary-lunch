import { UpdateUserSchema, UserRouterSchema } from "~/database/User"
import prisma from "~/lib/prisma"
import { hashedPassword } from "~/server/services/hashedPassword"

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

  const content = await readValidatedBody(event, UpdateUserSchema.parse)
  if (content.password) {
    const newHashedPassword = await hashedPassword(content.password)
    content.password = newHashedPassword
  }

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
        email: user.email
      },
      data: {
        ...content,
        updatedBy: event.context.auth.id
      }
    })

    return {
      status: 200,
      body: {
        message: "User updated successfully",
        data: updatedUser
      }
    }
  } catch (error: unknown) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error updating user",
      message: (error as Error).message
    })
  }
  
})