
export default defineEventHandler(async (event) => {
  if (!event.path.startsWith("/api")) return

  const session = getHeader(event, 'authorization')?.replace('Bearer ', '') ?? ''

  console.log("Session: ", session)
  
})