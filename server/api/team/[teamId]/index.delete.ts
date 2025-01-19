import { TeamRouterSchema } from "~/database/Team"
import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
  const teamId = (await getValidatedRouterParams(event, TeamRouterSchema.parse)).teamId

  const team = await prisma.team.findUnique({
    where: {
      id: teamId
    }
  })

  if (!team) {
    throw createError({
      statusCode: 404,
      message: "Team not found"
    })
  }

  try {
    await prisma.team.delete({
      where: {
        id: teamId
      }
    })

    return {
      status: 200,
      body: {
        message: "Team deleted successfully"
      }
    }
  } catch (error: unknown) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error deleting team",
      message: (error as Error).message
    })
  }
})