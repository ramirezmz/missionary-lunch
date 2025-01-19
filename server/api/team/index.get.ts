import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
  // TODO: Implementar paginacao, filtros e ordenacao
  const teams = await prisma.team.findMany()

  return {
    status: 200,
    body: {
      message: "Teams retrieved successfully",
      data: teams
    }
  }
})