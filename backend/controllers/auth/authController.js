//packages
// const crypto = require('crypto');
const jwt = require('jsonwebtoken');

//models
const User = require('../../db/models/user');
const { log } = require('console');


//Main code
const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};

exports.signup = async (req, res, next) => {
    try {
        const newUser = await User.query().insert({
            name: req.body.name,
            password: req.body.password,
            role: req.body.role
        });


        createSendToken(newUser, 201, res);

    } catch (error) {
        res.json(error);
    }
};

exports.login = (async (req, res, next) => {
    const { name, password } = req.body;


    if (!name || !password) {
        res.json({ status: 'failed' });
    }

    const user = await User.query()
        .where('name', name)
        // .select('password')
        .first();

    // save user in cookie
    const currentUser = { ...user, password: null };
    res.cookie('userData', JSON.stringify(currentUser), {
        maxAge: 3600000,
        httpOnly: true
    });



    if (!user || !(user.password == password)) {
        res.json({ status: 'failed' });
        return;
        // return next(new AppError('Incorrect email or password', 401));
    }

    // 3) If everything ok, send token to client
    createSendToken(user, 200, res);

});



exports.protect = (async (req, res, next) => {


    // 1) Getting token and check of it's there
    let token;
    token = req.cookies.jwt
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
    next();
});

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!req.cookies.userData) return res.json({ error: 'please login as admin' });
        const { role } = JSON.parse(req.cookies.userData);

        // roles ['admin', 'user']. role='user'
        if (!roles.includes(role)) {
            return res.status(401).json({ error: 'users cant get acces to this route' });
        }
        else {
            log("user got the acces.");
        }

        next();
    };
};
