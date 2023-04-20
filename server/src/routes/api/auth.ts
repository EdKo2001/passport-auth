import express from "express";
import passport from "passport";

import { authController } from "../../controllers";

import { authValidation } from "../../validations";

import { handleValidationErrors } from "../../utils";

const router = express.Router();

const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});
const googleCallback = passport.authenticate("google", {
  session: false,
  failureRedirect:
    "http://localhost:3000/register/error?text=Please confirm your registration.",
});

const facebookAuth = passport.authenticate("facebook");
const facebookCallback = passport.authenticate("facebook", {
  failureRedirect: "/login",
});

router.get("/login/success", authController.success);

router.get("/login/failed", authController.failed);

router.get("/logout", authController.logout);

router.get("/google", googleAuth);

router.get("/google/callback", googleCallback, authController.google);

router.get("/facebook", facebookAuth);

router.get("/facebook/callback", facebookCallback, authController.facebook);

router.post(
  "/register",
  authValidation,
  handleValidationErrors,
  authController.register
);

router.post("/register/confirm", authController.confirm);

router.post(
  "/login",
  authValidation,
  handleValidationErrors,
  authController.login
);

router.get("/user", authController.user);

router.all("/login/success", (req, res, next) => {
  res.status(405).json("Method Not Allowed");
});

router.all("/logout", (req, res, next) => {
  res.status(405).json("Method Not Allowed");
});

router.all("/google", (req, res, next) => {
  res.status(405).json("Method Not Allowed");
});

router.all("/google/callback", (req, res, next) => {
  res.status(405).json("Method Not Allowed");
});

router.all("/facebook", (req, res, next) => {
  res.status(405).json("Method Not Allowed");
});

router.all("/facebook/callback", (req, res, next) => {
  res.status(405).json("Method Not Allowed");
});

router.all("/register", (req, res, next) => {
  res.status(405).json("Method Not Allowed");
});

router.all("/register/confirm", (req, res, next) => {
  res.status(405).json("Method Not Allowed");
});

router.all("/login", (req, res, next) => {
  res.status(405).json("Method Not Allowed");
});

router.all("/user", (req, res, next) => {
  res.status(405).json("Method Not Allowed");
});

export default router;
