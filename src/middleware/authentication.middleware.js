import jwt from "jsonwebtoken";
import { User } from "../db/models/index.js";

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      status: false,
      message: "Unauthenticated. Token missing or invalid.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id, {
      include: [{ model: UserRole, as: "role" }],
    });

    if (!user) {
      return res
        .status(401)
        .json({ status: false, message: "User not found." });
    }

    if (user.status !== "active") {
      return res
        .status(403)
        .json({ status: false, message: "Account inactive." });
    }

    req.user = user; 
    next();
  } catch (err) {
    return res.status(401).json({
      status: false,
      message: "Unauthenticated. Token missing or invalid.",
    });
  }
};
