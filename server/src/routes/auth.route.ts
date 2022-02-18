import express from "express";
import * as auth from "../controllers/auth.controller";
import passport from "passport";

const router = express.Router();

router.post(
  "/login",
  passport.authenticate("local", { failureMessage: true }),
  auth.login
);

router.post("/register", auth.register);

router.get("logout", auth.logout);

export default router;
