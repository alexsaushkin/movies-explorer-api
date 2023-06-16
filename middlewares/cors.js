const allowedCors = [
  'https://thirdyou.nomoredomains.rocks',
  'http://thirdyou.nomoredomains.rocks',
  'https://api.thirdyou.nomoredomains.rocks',
  'http://api.thirdyou.nomoredomains.rocks',
  'http://localhost:3000',
  'https://158.160.101.153',
  'http://158.160.101.153',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  res.header('Access-Control-Allow-Credentials', true);

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  return next();
};