const router = require('express').Router();
const {
  getProfile,
  updateProfile,
} = require('../controllers/users');
const { updateUserValidator } = require('../middlewares/validator');

router.get('/me', getProfile);
router.patch('/me', updateUserValidator, updateProfile);

module.exports = router;