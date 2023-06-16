const router = require('express').Router();

const { signin } = require('../controllers/auth');
const { loginUserValidator } = require('../middlewares/validator');

router.post('/', loginUserValidator, signin);

module.exports = router;
