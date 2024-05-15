import { TRPCError } from "@trpc/server"

function handleTRPCError(error: Error | any, tableName: string) {
  console.error(`Error creating ${tableName}:`, error)
  return new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: `An error occurred while creating user ${tableName}`
  })
}

export default handleTRPCError
