import express from "express";
import redis from "redis";
import jwt from "jsonwebtoken";

import { fetchTeams, optionsData } from "npm-football-data";

import { extractLeagueFromPath } from "../helpers/leagues";

const REDIS_PORT = 6379;
const secretKey = "REDIS UUID";

const router = express.Router();

router.get("/teams", (req, res, next) => {
  const league = extractLeagueFromPath(optionsData.league.toString());
  const expiration = 99999999;
  client.exists(league, async (_, exists) => {
    if (exists === 0) {
      const teams = await fetchTeams();
      for (let i = 0; i < teams.length; i++) {
        const team = teams[i];
        const tokenId = jwt.sign({ team }, secretKey);
        client.hset(league, tokenId, team.toString());
        client.expire(league, expiration);
      }
      return res.status(200).json(teams);
    }

    client.hvals(league, (err, data) => {
      if (!data) {
        return res.status(500).json({
          message: "Server error"
        });
      }
      return res.status(200).json(data);
    });
  });
});

const client = redis.createClient(REDIS_PORT);
export default router;
