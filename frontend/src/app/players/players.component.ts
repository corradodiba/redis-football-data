import { Component, OnInit, OnDestroy } from '@angular/core';
import { Player } from './player.model';
import { Subscription } from 'rxjs';
import { PlayersService } from './players.service';
import { TeamsService } from '../teams/teams.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})

export class PlayersComponent implements OnInit, OnDestroy {
  players: Player[];
  playersSubs: Subscription;

  constructor(private playersDataServ: PlayersService, private teamsDataServ: TeamsService) {}

  ngOnInit() {
    this.playersSubs = this.playersDataServ.getPlayersUpdateListener()
      .subscribe((players: Player[]) => {
        this.players = players;
      });
      console.log(this.players);
  }

  ngOnDestroy() {
    this.playersSubs.unsubscribe();
  }
}
