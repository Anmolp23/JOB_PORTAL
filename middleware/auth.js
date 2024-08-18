import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from 'jsonwebtoken'
import { User } from '../models/userSchema.js';


export const isAuthorized = catchAsyncErrors(async (req, res, next) => {
    try {
        const {token} = req.cookies;
        console.log("token is",token)
        if (!token) {
            return next(new ErrorHandler("User not authorized", 401)); // Change status code to 401 for unauthorized access
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        console.log("Decoded JWT:", decoded);

        req.user = await User.findById(decoded.id);
        
        if (!req.user) {
            return next(new ErrorHandler("User not found", 404));
        }
        console.log("user is",req.user);
        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        // Handle JWT verification errors
        return next(new ErrorHandler("Invalid token", 401));
    }
});
