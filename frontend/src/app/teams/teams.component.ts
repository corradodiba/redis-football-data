import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TeamsService } from './teams.service';
import { PlayersService } from '../players/players.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})

export class TeamsComponent implements OnInit, OnDestroy {
   teams: string[];
   teamsSubs: Subscription;
   league: string;
   leagueSubs: Subscription;

  constructor(private teamsDataServ: TeamsService, private playersDataServ: PlayersService) {}

  ngOnInit() {
    this.teamsSubs = this.teamsDataServ.getTeamsUpdateListener()
      .subscribe((teams: string[]) => {
        this.teams = teams;
      });
    this.leagueSubs = this.teamsDataServ.getLeagueUpdateListener()
      .subscribe(league => {
        this.league = league;
      });
  }

  onSelectTeam(team: string) {
    this.playersDataServ.getPlayers(this.league, team);
  }

  ngOnDestroy() {
    this.teamsSubs.unsubscribe();
    this.leagueSubs.unsubscribe();
  }
}
