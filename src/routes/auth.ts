import validators from "@validators";
import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/google", passport.authenticate("google"));
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/failed",
    failureMessage: true,
  }),
  function (req, res) {
    res.send(req.user);
  }
);

router.get("/facebook", passport.authenticate("facebook"));
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/auth/failed",
    failureMessage: true,
  }),
  function (req, res) {
    res.send(req.user);
  }
);

router.get("/failed", (req, res) => {
  res.send("Login Failed");
});

router.post(
  "/login",
  validators.auth.login,
  passport.authenticate("local"),
  function (req, res) {
    res.send(req.user);
  }
);

export default router;
