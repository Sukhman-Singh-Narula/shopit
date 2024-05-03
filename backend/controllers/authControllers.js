import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import User from '../models/user.js';
import ErrorHandler from '../utils/errorHandler.js';
import sendToken from '../utils/sendToken.js';

// Register User => /api/v1/register
export const registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
    });

    sendToken(user, 201, res);
});

// Login User => /api/v1/login
export const LoginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (password === '' || email === '') {
        return next(new ErrorHandler('Please enter email and password', 400));
    }

    //Finding User in database 

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return next(new ErrorHandler('User not found', 400));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!user) {
        return next(new ErrorHandler('Wrong Password', 400));
    }
    

    sendToken(user, 201, res);
});

export const logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        message: "Logged out successfully"
    })
});

