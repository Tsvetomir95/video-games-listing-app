import { Component } from '@angular/core';
import { Game } from '../shared/games-list.model';
import { GamesService } from '../shared/games.service';
import { Observable, map, pipe, switchMap, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-games-detail',
  templateUrl: './games-detail.component.html',
  styleUrls: ['./games-detail.component.scss'],
})
export class GamesDetailComponent {
  game$: Observable<Game | undefined>;
  constructor(
    private gameService: GamesService,
    private route: ActivatedRoute
  ) {
    this.game$ = this.route.params.pipe(
      switchMap(({ id }) =>
        this.gameService.gameList$.pipe(
          map(games => games.find(item => item.id === +id))
        )
      )
    );
  }
}
