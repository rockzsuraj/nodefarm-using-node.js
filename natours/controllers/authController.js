const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const crypto = require('crypto');
const AppError = require('../utils/appError');
const createAsync = require('../utils/createAsync');
const USER = require('../models/userModel');
const mail = require('../utils/email');

const jwtSign = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });

const getTokenFromHeaders = (req) => req.headers.authorization.split(' ')[1];

const createSendToken = (user, res, statusCode, message) => {
  const token = jwtSign(user._id);
  user.password = undefined;

  const cookieOptions = {
    httpOnly: false,
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE_IN * 24 * 10 * 60 * 1000,
    ),
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token);

  res.status(statusCode).json({
    status: 'success',
    message,
    token,
    data: {
      user,
    },
  });
};

exports.login = createAsync(async (req, res, next) => {
  // 1. check if user has email and password
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 401));
  }

  const user = await USER.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('You email or password is incorrect', 401));
  }

  createSendToken(user, res, 200, 'user successfully login!');
});

exports.signup = createAsync(async (req, res, next) => {
  const newUser = await USER.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    passwordChangedAt: req.body.passwordChangedAt,
  });

  if (!newUser) {
    return next(new AppError('Sorry registration has failed!🙁', 400));
  }

  newUser.password = undefined;

  createSendToken(newUser, res, 201, 'New user created successfully!');
});

exports.protectRoutes = createAsync(async (req, res, next) => {
  // 1. check if header has token
  let token = '';
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = getTokenFromHeaders(req);
  }
  if (!token) {
    return next(new AppError('Please provide valid token', 401));
  }

  // 2. verification token
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);

  // 4. if email and password exists and compare them
  const freshUser = await USER.findById(decode.id);

  if (!freshUser) {
    return next(new AppError('User doest not exist', 400));
  }

  // Check if password changed after login
  if (freshUser.passwordChangedAfter(decode.iat)) {
    return next(
      new AppError(
        'Your password has changed recently! Please login again',
        401,
      ),
    );
  }

  req.user = freshUser;
  next();
});

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      next(new AppError('You do not have permission to do this action', 403));
    }

    next();
  };

exports.forgotPassword = createAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await USER.findOne({ email });

  if (!user) {
    next(new AppError(`User doesn't exist with given email!`, 404));
  }

  const resetToken = user.createPasswordResetToken();

  try {
    const mailOptions = {
      from: `Suraj kumar ${process.env.EMAIL_FROM}`,
      to: user.email,
      subject: 'Password Reset Request',
      text:
        `You are receiving this email because you (or someone else) has requested the reset of the password for your account.\n\n` +
        `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
        `${req.protocol}//${req.headers.host}/api/v1/users/resetpassword/${resetToken}\n\n` +
        `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };
    await mail.sendEmail(mailOptions);
    await user.save({ validateBeforeSave: false });
  } catch (error) {
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save({ validateBeforeSave: false });

    next(
      new AppError(
        `There was an error sending the email. Try again later!`,
        500,
      ),
    );
  }

  res.status(200).json({
    status: 'success',
    message: 'Password reset email sent successfully',
  });
});

exports.resetPassword = createAsync(async (req, res, next) => {
  const { password, confirmPassword } = req.body;
  const resetToken = req.params.token;

  const hashToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  const user = await USER.findOne({
    resetToken: hashToken,
    resetTokenExpires: { $gte: Date.now() },
  });

  if (!user) {
    next(new AppError('Invalid token or token has expired', 404));
  }

  user.password = password;
  user.confirmPassword = confirmPassword;
  user.resetToken = undefined;
  user.resetTokenExpires = undefined;

  await user.save();

  createSendToken(user, res, 200, 'Password has been reset successfully!');
});

exports.updatePassword = createAsync(async (req, res, next) => {
  const user = await USER.findById(req.user.id).select('+password');
  if (!user) {
    next(new AppError('User not found!', 404));
  }

  if (!(await user.correctPassword(req.body.password, user.password))) {
    next(new AppError(`Password doesn't match with current password!`, 404));
  }

  user.password = req.body.newPassword;
  user.confirmPassword = req.body.confirmPassword;
  await user.save();

  createSendToken(user, res, 200, 'Password is successfully updated!');
});
