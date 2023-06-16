const User = require('../models/users');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getProfile = async (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
  .orFail()
  .then((user) => res.send(user))
  .catch((err) => {
    if (err.name === 'DocumentNotFoundError') {
      next(new NotFoundError('Пользователь не найден.'));
    } else {
      next(err);
    }
  });
};

module.exports.updateProfile = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    {
      email,
      name,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Пользователь не найден.'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('Неправильные данные.'));
      } else {
        next(err);
      }
    });
};