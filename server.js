import app from "./app.js"
import cloudinary from "cloudinary"

/*this is how u set up cloudinary v2 means that we are using version2*/
cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLIENT_NAME,
    api_key:process.env.CLOUDINARY_CLIENT_API,
    api_secret:process.env.CLOUDINARY_CLIENT_SECRET,
})

app.listen(process.env.PORT,()=>{
    console.log(`server is running on ${process.env.PORT}`);
})