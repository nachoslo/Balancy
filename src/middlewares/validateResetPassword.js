import jwt from "jsonwebtoken";

export const validateResetPassword = (req, res, next) => {
  const { token } = req.params;

  if (!token) return res.send(false);

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json(["Token expired"]);
    next();
  });
};
