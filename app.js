require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const validationErrors = require('celebrate').errors;
const cookieParser = require('cookie-parser');

const {
  ERROR_DEFAULT,
  MESSAGE_DEFAULT,
} = require('./utils/constants');

const router = require('./routes/index');

const cors = require('./middlewares/cors');
const limiter = require('./middlewares/limiter');
const errors = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_CONNECT = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

mongoose.connect(DB_CONNECT);

app.use(express.json());
app.use(cookieParser());

app.use(helmet());
app.use(cors);
app.use(limiter);

app.use(requestLogger);

app.use('/', router);
app.use(errorLogger);
app.use(validationErrors());
app.use(errors);

app.use((err, req, res, next) => {
  const { statusCode = ERROR_DEFAULT, message = MESSAGE_DEFAULT } = err;
  res.status(statusCode).send({ message });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
