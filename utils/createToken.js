const jwt = require("jsonwebtoken");

const createToken = (_id, name, verified) => {
  return jwt.sign(
    { _id: _id, name: name, verified: verified },
    process.env.TOKEN_SECRET
  );
};

module.exports = createToken;
