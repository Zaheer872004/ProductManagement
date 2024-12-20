import express from "express";
import logger from "./helper/logger.js";
import morgan from "morgan";
import cors from 'cors';
import cookieParser from "cookie-parser";
import { ApiError } from "./helper/index.js";

const app = express();


// we can customise the origin as well here, adding multiple origin.
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


// commmon middleware here on express
app.use(express.json()) // req size must be less or equal to 20kb.
app.use(express.urlencoded({ extended: true })) // req data must be url encoded like @ # $ like this 
app.use(express.static("public"))
app.use(cookieParser())





const morganFormat = ":method :url :status :response-time ms";
app.use(
    morgan(morganFormat, {
        stream: {
            write: (message) => {
                const logObject = {
                    method: message.split(" ")[0],
                    url: message.split(" ")[1],
                    status: message.split(" ")[2],
                    responseTime: message.split(" ")[3],
                };
                logger.info(JSON.stringify(logObject));
            },
        },
    })
);


// here our routes middleware
import healthCheck from "./routes/index.js"
import userAuth from './routes/index.js'

// health check route
app.use("/api", healthCheck)

// user route
app.use("/api", userAuth)



// here our custom error response middleware

app.use((err, req, res, next) => {
    console.error(err.stack);

    if (err instanceof ApiError) {
        return res
                .status(err.statusCode)
                .json({
                    statusCode: err.statusCode,
                    message: err.message,
                    success: err.success,
                    errors: err.errors, // Use `errors` from ApiError class
                    stack: err.stack // Optionally include stack trace if needed
                });
    }

    return res.status(500).json({
        statusCode: 500,
        message: "Internal Server Error",
        success: false
    });
});






export {
    app,
}