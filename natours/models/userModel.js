const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

/**
 * @type {mongoose.SchemaDefinitionProperty}
 */

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email.'],
    unique: [true, 'Email you provided is already registered. Please Sign in'],
    lowercase: [true, 'email should be lowercased'],
    validate: {
      validator: validator.isEmail,
      message: 'Please enter a valid email',
    },
  },
  role: {
    type: String,
    enum: {
      values: ['ADMIN', 'TOUR_LEAD', 'USER'],
    },
    default: 'USER',
  },
  password: {
    type: String,
    required: [true, 'Please enter a password.'],
    validate: {
      validator: validator.isStrongPassword,
      message:
        'A password should be 8 character long and includes 1 minLowercase, 1 minUppercase, 1 minNumbers, 1 minSymbols.',
    },
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please enter a confirm password'],
    validate: {
      validator: function (val) {
        return this.password === val;
      },
      message: `Confirm password doesn't match with the password`,
    },
  },
  passwordChangedAt: Date,
  resetToken: String,
  resetTokenExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});
// Only run when .create .save method is called
schema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

schema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) next();
  this.passwordChangedAt = Date.now();
  next();
});

schema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

schema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

schema.methods.passwordChangedAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const passwordChangeTime = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    return passwordChangeTime > JWTTimeStamp;
  }

  return false;
};

schema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.resetToken = hashedToken;
  this.resetTokenExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', schema);

module.exports = User;
