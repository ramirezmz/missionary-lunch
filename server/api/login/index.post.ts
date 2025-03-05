import { z } from "zod"
import prisma from "~/lib/prisma"
import { comparePassword } from "~/server/services/hashedPassword"
import { generateToken } from "~/server/services/token"

const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string({
    message: "Password is required",
  }),
})

export default defineEventHandler(async (event) => {
  const content = await readValidatedBody(event, LoginSchema.parse)

  const user = await prisma.user.findUnique({
    where: {
      email: content.email,
    },
  })

  if (!user) {
    return {
      status: 404,
      body: {
        message: "User not found",
      },
    }
  }
if (!user.password) {
  // Precisamos fazer que o usuario cadastre sua senha  
  return 
}
  const passwordMatch = comparePassword(content.password, user.password)

  if (!passwordMatch) {
    return {
      status: 401,
      body: {
        message: "Invalid password",
      },
    }
  }
  const token = generateToken(user.id)
  
  return {
    status: 200,
    body: {
      message: "Login successful",
      data: user,
      token,
    },
  }

})