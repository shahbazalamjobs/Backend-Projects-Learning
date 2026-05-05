import User from './model/User.js'
import generateToken from './utils/generateToken.js'

export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const userExist = await User.findOne({ email });

        if(userExist) {
            return res.status(400).json({message:'User already exist'});
        }

        const user = await User.create({ name, email, password });

        sendTokenResponse(user, 201, res);
    } catch (error) {
        next(error);
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        const user = await User.findOne({email}).select('+password');

        if(!user || !(await user.matchPassword(password))) {
            return res.status(401).json({message: 'Invalid credentials'});
        }

        sendTokenResponse(user, 200, res);
    } catch (error) {
        next(error);
    }
}

const sendTokenResponse = (user, statusCode, res) => {
    res.status(statusCode).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role)
    });
};