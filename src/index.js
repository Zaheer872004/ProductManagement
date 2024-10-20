import { app } from "./app.js";
import { prisma } from "./prismaExtension/userHooks.js";
import logger from "./helper/logger.js";
import dotenv from "dotenv";
dotenv.config({}) // automatically detect the .env file 


const PORT = process.env.PORT || 4000



// prisma.$connect(
//     () => {
//         app.listen(PORT, () => {
//             logger.info(`Server running in http://localhost:${PORT}`);
//         });
//     }
// ).catch((error) => {
//     logger.error(error);
// })



prisma.$connect()
.then(() => {
    app.listen(PORT,()=>{
        logger.info(`Server running in http://localhost:${PORT}`);
    })
})
.catch(() => {
    logger.error("Error connecting to database");
})








