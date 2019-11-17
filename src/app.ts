import express from "express";
import leaguesRouter from "./routes/leagues";

const PORT = 2000;

const app = express();

app.use("/leagues", leaguesRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
