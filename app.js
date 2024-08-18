import express from 'express'
import dotenv from 'dotenv'
import cors from "cors"
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import userRouter from './routes/userRouter.js'
import applicationRouter from './routes/applicationRouter.js'
import jobRoutes from './routes/jobRoutes.js'
import { dbConnection } from './database/dbConnection.js';
import { errorMiddleware } from './middleware/error.js';

const app=express();
dotenv.config({path:"./config/config.env"});


//connection with frontend
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","DELETE","PUT"],
    credentials:true,
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//file upload karna ka liya
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/",
})
)

app.use('/api/v1/user',userRouter)
app.use('/api/v1/application',applicationRouter)
app.use('/api/v1/job',jobRoutes)

dbConnection();

//error middleware should be used in last only
app.use(errorMiddleware);
export default app;