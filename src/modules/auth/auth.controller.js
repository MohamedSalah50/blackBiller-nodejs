import { Router } from "express";
import { register, login, logout , getProfile, updateProfile, statusUpdate } from "./auth.service.js";
import { authenticate } from "../../middleware/authentication.middleware.js";
import * as validateService from "./auth.validation.js";
import { validation } from "../../middleware/validation.middleware.js";
import { validate } from "uuid";

const router = Router();

router.post("/register", validation(validateService.register), register);
router.post("/login", validation(validateService.login), login);
router.post("/logout", logout);

router.get("/profile", authenticate, getProfile);
router.put(
  "/profile",
  authenticate,
  validation(validateService.updateProfile),
  updateProfile,
);
router.patch(
  "/status",
  authenticate,
  validation(validateService.statusUpdate),
  statusUpdate,
);

export default router;
