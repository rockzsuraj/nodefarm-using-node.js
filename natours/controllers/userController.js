const createAsync = require('../utils/createAsync');
const USER = require('../models/userModel');

exports.deleteMe = createAsync(async (req, res, next) => {
  const id = req.user._id;

  const info = await USER.findByIdAndUpdate(id, { active: false, new: true });
  console.log('info', info);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getAllUsers = createAsync(async (req, res) => {
  const users = await USER.find();
  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
