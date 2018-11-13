const apiModule = {};

apiModule.accessControl = function (checkFunction, statusCode) {
  return (req, res, next) => {
    if (checkFunction(req.user)) {
      return next();
    }
    return res.status(statusCode).end();
  };
};

apiModule.cors = function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    res.end();
  } else {
    next();
  }
};

apiModule.authControl = function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else res.status(401).send();
};

module.exports = apiModule;
