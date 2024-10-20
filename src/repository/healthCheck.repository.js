import { prisma } from "../prismaExtension/userHooks.js"
import { asyncHandler } from "../helper/index.js"


export const healthCheckRepository = asyncHandler( async () => {

    const check = await prisma.$queryRaw`SELECT 1`;
    console.log(check)
    return check;

})


// await prisma.$queryRaw`SELECT 1`; // Select 1 from table.


