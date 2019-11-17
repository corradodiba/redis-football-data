import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

const URL = `${environment.apiUrl}/leagues/`;

@Injectable({
  providedIn: 'root'
})

export class TeamsService {

  private teams: string[] = [];
  private teamsUpdated = new Subject<string[]>();
  private league: string;
  private leagueUpdated = new Subject<string>();
  constructor(private http: HttpClient) { }

  getTeams(league: string): string[] {
    this.league = league;
    this.http
      .get<string[]>(`${URL}${league}/teams`)
      .subscribe((teams: string[]) => {
        this.teams = teams;
        this.teamsUpdated.next([...this.teams]);
        this.leagueUpdated.next(this.league);
      });
    return this.teams;
  }

  getTeamsUpdateListener(): Observable<string[]> {
    return this.teamsUpdated.asObservable();
  }

  getLeagueUpdateListener(): Observable<string> {
    return this.leagueUpdated.asObservable();
  }
}
