import { TeamRouterSchema, UpdateTeamSchema } from "~/database/Team"
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

  const content = await readValidatedBody(event, UpdateTeamSchema.parse)

  const payload = {
    ...content,
    updatedBy: event.context.auth.id
  }

  try {
    const updatedTeam = await prisma.team.update({
      where: {
        id: teamId
      },
      data: payload
    })

    return {
      status: 200,
      body: {
        message: "Team updated successfully",
        data: updatedTeam
      }
    }
  } catch (error: unknown) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error updating team",
      message: (error as Error).message
    })
  }
})