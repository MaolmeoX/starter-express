import asyncHandler from '../utils/asyncHandler';
import UserModel from '../models/user';

export const postUser = asyncHandler(async (req, res, next) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };
  res.status(201).json(await UserModel.create(user));
});

export const loginUser = asyncHandler(async (req, res, next) => {});
