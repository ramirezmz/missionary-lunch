import { TeamSchema } from "~/database/Team"
import prisma from "~/lib/prisma"


export default defineEventHandler(async (event) => {
  const content = await readValidatedBody(event, TeamSchema.parse)

  const payload = {
    ...content,
    createdBy: event.context.auth.id,
    updatedBy: event.context.auth.id
  }

  try {
    const team = await prisma.team.create({
      data: payload
    })

    return {
      status: 201,
      body: {
        message: "Team created successfully",
        data: team
      }
    }
  } catch (error: unknown) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error creating team",
      message: (error as Error).message
    })
  }
})