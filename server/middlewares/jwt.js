const { sign, verify } = require("jsonwebtoken");

const createTokens = (user) => {
  const accessToken = sign({ id: user }, process.env.JWT_SECRET);
  return accessToken;
};

const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader,"authHeader 10jwt");
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log(token,"token  13jwt");
    verify(token, process.env.JWT_SECRET, (err, decoded) => {
      console.log(token, process.env.JWT_SECRET,"token, process.env.JWT_SECRET 15 jwt");
      if (err) {
        res.json("unauthorized");
      }else{
        req._id = decoded;
        next();
      }
    });
  } else {
    
    res.json("unauthorized");
  }
};

module.exports = {
  createTokens,
  
  validateToken,

};