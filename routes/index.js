const router = require('express').Router();

const users = require('./users');
const movies = require('./movies');
const notFound = require('./notFound');
const signup = require('./signup');
const signin = require('./signin');
const logout = require('./logout');
const auth = require('../middlewares/auth');

router.use('/users', auth, users);
router.use('/movies', auth, movies);
router.use('/signin', signin);
router.use('/signup', signup);
router.use('/signout', auth, logout);
router.use('*', auth, notFound);

module.exports = router;
