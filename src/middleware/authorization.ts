const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config");

module.exports = (req: any, res: any, next: any) => {
  const authorization: string = req.headers["authorization"];
  if (authorization === undefined) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
  } else {
    const token = req.headers["authorization"].split(" ")[1];
    if (token) {
      try {
        const verifyToken = jwt.verify(token, SECRET_KEY);
        req.user = verifyToken;
        next();
      } catch (error) {
        return res.status(422).json({
          status: 422,
          error,
        });
      }
    } else {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized",
      });
    }
  }
};
