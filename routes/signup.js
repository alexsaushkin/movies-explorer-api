const router = require('express').Router();

const { signup } = require('../controllers/auth');
const { createUserValidator } = require('../middlewares/validator');

router.post('/', createUserValidator, signup);

module.exports = router;
