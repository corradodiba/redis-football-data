import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Player } from './player.model';

const URL = `${environment.apiUrl}/leagues/`;

@Injectable({
  providedIn: 'root'
})

export class PlayersService {

  private players: Player[] = [];
  private playersUpdated = new Subject<Player[]>();
  league: string;

  constructor(private http: HttpClient) { }

  getPlayers(league: string, team: string): Player[] {
    this.league = league;
    this.http
      .get<Player[]>(`${URL}${league}/players/${team}`)
      .subscribe((players: Player[]) => {
        this.players = players;
        this.playersUpdated.next([...this.players]);
      });
    return this.players;
  }

  getPlayersUpdateListener(): Observable<Player[]> {
    return this.playersUpdated.asObservable();
  }
}
