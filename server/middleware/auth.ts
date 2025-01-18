import prisma from "~/lib/prisma"
import { verifyToken } from "../services/token"

export default defineEventHandler(async (event) => {
  if (!event.path.startsWith("/api")) return

  const session = getHeader(event, 'authorization')?.replace('Bearer ', '') ?? ''

  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: "Token is required"
    })
  }
  const validateToken = verifyToken(session)

  if (typeof validateToken !== 'object' || !validateToken.userId) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: "Invalid token"
    })
  }

  const user = await prisma.user.findUnique({
    where: {
      id: validateToken.userId
    }
  })

  event.context.auth = user
})