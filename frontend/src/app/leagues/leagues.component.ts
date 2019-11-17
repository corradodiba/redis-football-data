import { Component, OnInit, OnDestroy } from '@angular/core';
import { LeaguesService } from './leagues.service';
import { Subscription } from 'rxjs';
import { TeamsService } from '../teams/teams.service';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css']
})

export class LeaguesComponent implements OnInit, OnDestroy {
  leaguesSubs: Subscription;
  leagues: string[];

  constructor(private leaguesDataServ: LeaguesService, private teamDataServ: TeamsService) {}

  ngOnInit() {
    this.leaguesDataServ.getLeagues();
    this.leaguesSubs = this.leaguesDataServ.getLeaguesUpdateListener()
      .subscribe((leagues: string[]) => {
        this.leagues = leagues;
      });
  }

  onSelectTeam(league: string) {
    this.teamDataServ.getTeams(league);
  }

  ngOnDestroy() {
    this.leaguesSubs.unsubscribe();
  }

}
