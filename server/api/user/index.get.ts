import prisma from "~/lib/prisma"

export default defineEventHandler(async (event)=> {
  const users = await prisma.user.findMany({
    where:{
      active: true
    }
  })

  return {
    status: 200,
    body: {
      message: "Users retrieved successfully",
      data: users
    }
  }
})