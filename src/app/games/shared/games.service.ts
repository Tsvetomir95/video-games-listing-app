import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Game, GameList } from './games-list.model';
import { BehaviorSubject, Observable, map, of, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private readonly baseUrl = '/api';
  private gameListSub$ = new BehaviorSubject<Game[]>([]);
  gameList$ = this.gameListSub$.asObservable();
  constructor(private http: HttpClient) {}

  getListOfGames() {
    const params = new HttpParams()
      .set('key', environment.apiKey)
      .set('page_size', '12')
      .set('ordering', '-rating');

    return this.http
      .get<GameList>(`${environment.apiUrl}/api/games`, { params })
      .pipe(map(response => response.results));
  }
  setGamesList(games: Game[]) {
    this.gameListSub$.next(games);
  }

  searchGamesByQuery(query: string ) {
    const params = new HttpParams()
      .set('key', environment.apiKey)
      .set('page_size', '12')
      .set('ordering', '-rating')
      .set('search', query);
    return this.http
      .get<GameList>(`${environment.apiUrl}/api/games`, { params })
      .pipe(map(response => response.results), shareReplay());
  }
}
