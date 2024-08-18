import { catchAsyncErrors } from "../middleware/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from '../middleware/error.js'
import { sendToken } from "../utils/jwtToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {
const {name,email,phone,role,password}=req.body;
if(!name || !email || !phone || !role || !password){
return next(new ErrorHandler("please fill full registration form"))
}

const isEmail=await User.findOne({email});

if(isEmail){
return next(new ErrorHandler("email already exists"));
}

const user=await User.create({
    name,
    email,
    phone,
    role,
    password,
})
sendToken(user,200,res,"user registered successfully")
});

export const login=catchAsyncErrors(async(req,res,next)=>{
    const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide email ,password and role."));
  }
  const user = await User.findOne({ email }).select("+password");

  //token=await user.generateAuthToken();
  //console.log(token);
  /*res.cookie("jobtoken",token,{
      expires:new Date(Date.now()+25892000000),
      httpOnly:true
  })*/

  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  if (user.role !== role) {
    return next(
      new ErrorHandler(`User with provided email and ${role} not found!`, 404)
    );
  }
  sendToken(user, 201, res, "User Logged In!");
});

export const logout=catchAsyncErrors(async(req,res,next)=>{
   // console.log('COOKIE_EXPIRE:', process.env.COOKIE_EXPIRE);
    res.status(201).cookie("token","",{
        httpOnly:true,
        expires:new Date(Date.now()),
        secure:true,
        sameSite:"None",
    })
    .json({
        success:true,
        message:"user logged out successfully"
    })
})

export const getUser = catchAsyncErrors((req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});