const expressAsyncHandler = require("express-async-handler");
const { body, validationResult, param } = require("express-validator");

const validationMiddleware = expressAsyncHandler((req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
});

module.exports = validationMiddleware;