import { leaguesList, optionsData } from "npm-football-data";

export const setLeague = (req, res, next) => {
  const { league } = req.params;
  optionsData.league = findLeague(league);
  return next();
};

export const findLeague = (league: string) => {
  league = league.replace("-", "").toUpperCase();

  for (const nation in leaguesList) {
    if (leaguesList[nation][league]) {
      return leaguesList[nation][league];
    }
  }

  return undefined;
};

export const getAllLeagues = () => {
  const leagues: String[] = [];
  for (const nation in leaguesList) {
    for (const l in leaguesList[nation]) {
      const customLeague = (leaguesList[nation][l] as string).split("/");
      const league = customLeague[customLeague.length - 1];
      leagues.push(league);
    }
  }
  return leagues;
};

export const extractLeagueFromPath = (leaguePath: string) => {
  const league = leaguePath.split("/");
  return league[league.length - 1];
};
