import mongoose from 'mongoose';

export const dbConnection=()=>{
    mongoose.connect(process.env.MONGO_URL,{
    dbName:"job_application",
    useNewUrlParser: true,       // Use the new URL string parser
    useUnifiedTopology: true,    // Use the new Server Discover and Monitoring engine
    serverSelectionTimeoutMS: 30000,  // Connection timeout in milliseconds
    socketTimeoutMS: 45000,      
    })
    .then(()=>{
        console.log("connected to database")
    })
    .catch((error)=>{
        console.log("No Connection")
    })
}
