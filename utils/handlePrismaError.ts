import { Prisma } from "@prisma/client"

interface ErrorResponse {
  error: string
}

function handlePrismaError(
  error: Error | any,
  tableName: string
): ErrorResponse {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return {
          error: `There is a unique constraint violation, a new ${tableName} cannot be created with this data`
        }
      case "P2025":
        return {
          error: `Foreign key constraint violation, please provide valid data for related fields in ${tableName}`
        }
      default:
        return {
          error: `An unknown Prisma error occurred while modifying ${tableName}`
        }
    }
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    return {
      error: `Validation error: ${error.message} in ${tableName}`
    }
  }
  return {
    error: `An unknown error occurred while modifying ${tableName}`
  }
}

export default handlePrismaError
