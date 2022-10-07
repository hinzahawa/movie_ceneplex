module.exports = (req: any, res: any, next: any) => {
  const PRIVATE_KEY: string = process.env.PRIVATE_KEY || "O5rd7VNsENJ5u5UFABvZ";
  const authorization: string = req.headers["authorization"];
  if (authorization === undefined) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
  } else {
    const token = req.headers["authorization"].split(" ")[1];
    if (token === PRIVATE_KEY) {
      req.token = token;
      next();
    } else {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized",
      });
    }
  }
};
