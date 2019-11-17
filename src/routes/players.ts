import express from "express";
import jwt from "jsonwebtoken";
import redis from "redis";

import {
  fetchPlayersForTeam,
  leaguesList,
  optionsData
} from "npm-football-data";

import Player from "npm-football-data/dist/lib/models/player.model";

const REDIS_PORT = 6379;
const secretKey = "REDIS UUID";

const router = express.Router();

optionsData.league = leaguesList.Italy.SERIEA;

router.get("/players/:team", async (req, res, next) => {
  const { team } = req.params;
  const expiration = 604800;
  client.exists(team, async (_, exists) => {
    if (exists === 0) {
      const players = await fetchPlayersForTeam(team);
      const fetchedPlayers: Player[] = [];
      for (let i = 0; i < players.length; i++) {
        const player = players[i];
        const tokenPlayerId = jwt.sign({ ...player }, secretKey);
        client.hset(team, tokenPlayerId, player.name.toString());
        client.expire(team, expiration);
        fetchedPlayers.push(player);
      }
      return res.status(200).json(fetchedPlayers);
    }
    client.hkeys(team, (err, fetchedlayers) => {
      const players: Player[] = [];
      for (let i = 0; i < fetchedlayers.length; i++) {
        const tokenPlayerId = fetchedlayers[i];
        const decodedPlayer: any = jwt.verify(tokenPlayerId, secretKey);
        delete decodedPlayer.iat;
        players.push({ ...decodedPlayer });
      }
      res.status(200).json(players);
    });
  });
});

const client = redis.createClient(REDIS_PORT);
export default router;
