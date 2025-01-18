import { UserSchema } from "~/database/User"
import prisma from "~/lib/prisma"
import {hashedPassword} from "~/server/services/hashedPassword"

export default defineEventHandler(async (event) => {
  const content = await readValidatedBody(event, UserSchema.parse)
  const newHashedPassword = await hashedPassword(content.password)

  const payload = {
    ...content,
    password: newHashedPassword
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
 } catch (error: any) {
    return {
      status: 500,
      body: {
        message: "Error creating user",
        error: error.message
      }
    }
 }
  
})