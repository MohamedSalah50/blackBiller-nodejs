import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, UserRole } from "../../db/models/index.js";

// ─── Register ────────────────────────────────────────
export const register = async (req, res) => {
  const { full_name, email, mobile, password, country_code } = req.body;

  try {
    // check existing
    const existing = await User.scope("withSecret").findOne({
      where: email ? { email } : { mobile },
    });
    if (existing) {
      return res.status(409).json({
        status: false,
        message: email ? "Email already exists" : "Mobile already exists",
      });
    }

    const hashed = await bcrypt.hash(password, 12);

    const user = await User.create({
      // role_id: 4, // default role
      full_name,
      email,
      mobile,
      country_code: country_code ?? "+91",
      password: hashed,
      license_key: ("LIC-" + Date.now()).toUpperCase(),
      referral_code: ("REF-" + Date.now()).toUpperCase(),
      status: "active",
    });

    const token = jwt.sign(
      { id: user.id, role_id: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return res.status(201).json({
      status: true,
      message: "User registered successfully",
      access_token: token,
      token_type: "Bearer",
      data: user,
    });
  } catch (err) {
    console.error("Register error:", err.message);
    return res
      .status(500)
      .json({ status: false, message: "Registration failed" });
  }
};

// ─── Login ───────────────────────────────────────────
export const login = async (req, res) => {
  const { email, mobile, password } = req.body;

  try {
    if (!email && !mobile) {
      return res
        .status(422)
        .json({ status: false, message: "Email or mobile is required" });
    }
    if (!password) {
      return res
        .status(422)
        .json({ status: false, message: "Password is required" });
    }

    const user = await User.scope("withSecret").findOne({
      where: email ? { email } : { mobile },
      include: [{ model: UserRole, as: "role" }],
    });

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid credentials" });
    }

    const statusMessages = {
      deleted: "Account has been deleted",
      suspended: "Account is suspended",
      inactive: "Account is inactive",
      banned: "Account is banned",
    };
    if (user.status !== "active") {
      return res.status(403).json({
        status: false,
        message: statusMessages[user.status] ?? "Account inactive",
      });
    }

    const token = jwt.sign(
      { id: user.id, role_id: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    user.password = undefined;

    return res.status(200).json({
      status: true,
      message: "Login successful",
      access_token: token,
      token_type: "Bearer",
      data: user,
    });
  } catch (err) {
    console.error("Login error:", err.message);
    return res.status(500).json({ status: false, message: "Login failed" });
  }
};

// ─── Logout ──────────────────────────────────────────
export const logout = async (req, res) => {
  return res
    .status(200)
    .json({ status: true, message: "Logged out successfully" });
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [{ model: UserRole, as: "role" }],
    });

    return res.status(200).json({ status: true, data: user });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.scope("withSecret").findByPk(req.user.id);

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 12);
    }

    // حذف password_confirmation عشان مش column في الـ DB
    delete req.body.password_confirmation;

    await user.update(req.body);
    await user.reload();

    user.password = undefined;

    return res.status(200).json({
      status: true,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export const statusUpdate = async (req, res, next) => {
  try {
    const user = await User.scope("withSecret").findByPk(req.user.id);

    await user.update({ status: req.body.status });

    return res.status(200).json({
      status: true,
      message: `User status updated to ${req.body.status}`,
      user_id: user.id,
    });
  } catch (err) {
    next(err);
  }
};
