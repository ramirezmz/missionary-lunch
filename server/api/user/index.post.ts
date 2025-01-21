import { UserSchema } from "~/database/User"
import prisma from "~/lib/prisma"
import {hashedPassword} from "~/server/services/hashedPassword"

export default defineEventHandler(async (event) => {
  const content = await readValidatedBody(event, UserSchema.parse)
  let newHashedPassword = null
  if (content?.password) {
    newHashedPassword = await hashedPassword(content.password)
  }
  
  const payload = {
    ...content,
    createdBy: event.context?.auth?.id ?? content.email,
    updatedBy: event.context?.auth?.id ?? content.email,
    ...(newHashedPassword && {password: newHashedPassword})
  }
 try {
   const user = await prisma.user.create({
    data: payload
  })

  return {
    status: 201,
    body: {
      message: "User created successfully",
      data: user
  }
}
 } catch (error: unknown) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error creating user",
      message: (error as Error).message
    })
 }
  
})