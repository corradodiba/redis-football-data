import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

const URL = `${environment.apiUrl}/leagues`;

@Injectable({
  providedIn: 'root'
})
export class LeaguesService {

  private leagues: string[] = [];
  private leaguesUpdated = new Subject<string[]>();
  constructor(private http: HttpClient) { }

  getLeagues(): string[] {
    this.http
      .get<string[]>(
        URL
      )
      .subscribe((leagues: string[]) => {
        this.leagues = leagues;
        this.leaguesUpdated.next([...this.leagues]);
      });
    return this.leagues;
  }

  getLeaguesUpdateListener(): Observable<string[]> {
    return this.leaguesUpdated.asObservable();
  }
}
