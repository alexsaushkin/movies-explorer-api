const router = require('express').Router();

const { logout } = require('../controllers/auth');

router.post('/', logout);

module.exports = router;