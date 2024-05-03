import catchAsyncErrors from './catchAsyncErrors.js'
import ErrorHandler from '../utils/errorHandler.js'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

// Check if person is autheticated 

export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler('Login first to access this resource.', 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user =  await User.findById(decoded.id);
    next()
});

export const authoriseRoles = catchAsyncErrors((...roles) => {
    return(req, res, next) => {
        if(!roles.includes(req.user.role)){
        return next(new ErrorHandler(`Role(s) (${req.user.role}) does not have access to do this.`, 403))
            
        }
    };
    next();
});