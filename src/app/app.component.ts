import { Component, OnDestroy } from '@angular/core';
import { GamesService } from './games/shared/games.service';
import { Subject, shareReplay, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'video-games-listing-app-front-end';
  private unsubscribe$ = new Subject<void>();
  constructor(private gamesService: GamesService) {
    this.gamesService
      .getListOfGames()
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(res => this.gamesService.setGamesList(res))
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
