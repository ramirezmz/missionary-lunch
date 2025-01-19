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

  return {
    status: 200,
    body: {
      message: "Team retrieved successfully",
      data: team
    }
  }
})