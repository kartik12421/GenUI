import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "User is not authenticated" });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT secret is not configured" });
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verifyToken.userId;

    next();
  } catch (error) {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default isAuth;
