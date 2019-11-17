import express from "express";

import teamsRouter from "./routes/teams";
import playersRouter from "./routes/players";

import { leaguesList, optionsData } from "npm-football-data";

import { setLeague } from "./helpers/leagues";

const PORT = 2000;

const app = express();

optionsData.league = leaguesList.Italy.SERIEA;

app.use("/:league", setLeague, teamsRouter);
app.use("/:league", setLeague, playersRouter);

// app.get("/leagues", (req, res, next) => {
//   res.status(200).json(getAllLeagues());
// });

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
