import jwt from "jsonwebtoken";
import User from "./../models/user.js";

const protectedRoute = async (req, res, next) => {
  try {
    let token = req.cookie.token;
    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const resp = await User.findById(decodedToken.userId).select(
        "isAdmin email"
      );
      req.user = {
        email: resp.email,
        isAdmin: resp.isAdmin,
        userId: decodedToken.userId,
      };
      return res.status(200).json({ message: "Authenticated" });
      next();
    }
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Not authorized. Try login again" });
  }
};

const isAdminRoute = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({
      message: "Not an admin user.",
    });
  }
};

export { protectedRoute, isAdminRoute };
