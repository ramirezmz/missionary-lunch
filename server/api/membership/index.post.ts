import { MembershipSchema } from "~/database/Membership"
import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
  const content = await readValidatedBody(event, MembershipSchema.parse)

  const payload = {
    ...content,
    createdBy: event.context.auth.id,
    updatedBy: event.context.auth.id
  }

  // validate that the membership does not already exist
  const isMembershipExist = await prisma.membership.findFirst({
    where: {
      userId: payload.userId,
      teamId: payload.teamId,
    }
  })

  if (isMembershipExist) {
    throw createError({
      statusCode: 400,
      message: "Membership already exists"
    })
  }

  try {
    const membership = await prisma.membership.create({
      data: payload
    })

    return {
      status: 201,
      body: {
        message: "Membership created successfully",
        data: membership
      }
    }
  } catch (error: unknown) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error creating membership",
      message: (error as Error).message
    })
  }
})