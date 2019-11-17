import express from "express";
import teamsRouter from "../routes/teams";
import playersRouter from "../routes/players";

import { setLeague, getAllLeagues } from "../helpers/leagues";

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json(getAllLeagues());
});
router.use("/:league", setLeague, teamsRouter);
router.use("/:league", setLeague, playersRouter);

export default router;
