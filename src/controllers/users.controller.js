const asyncHandler = require("../utils/asyncHandler");
const UserModel = require("../models/user").UserModel;

const postUser = asyncHandler( async(req, res, next) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
    };

    console.log(user);
    res.status(201).json(await UserModel.create(user));
});

module.exports = {
    postUser,
}