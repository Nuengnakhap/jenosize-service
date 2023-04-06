import validators from "@validators";
import { Router } from "express";
import searchRouter from "./search";
import gameRouter from "./game";
import authRouter from "./auth";

const router = Router();

router.use("/search", searchRouter);
router.use("/game", gameRouter);
router.use("/auth", authRouter);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

export default router;
