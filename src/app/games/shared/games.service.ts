import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { GameList } from './games-list.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private readonly baseUrl = '/api';
  constructor(private http: HttpClient) {}

  getListOfGames() {
    const params = new HttpParams()
      .set('key', environment.apiKey)
      .set('page_size', '12').set('ordering', '-rating');

    return this.http
      .get<GameList>(`${environment.apiUrl}/api/games`, { params })
      .pipe(map(response => response.results));
  }
}
