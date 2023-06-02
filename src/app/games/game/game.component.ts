import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../shared/games-list.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {
  @Input() gameItem!: Game;

  constructor(private router: Router) {}

  goToDetail(game: Game): void {
    const gameId = game ? game.id : null;
    this.router.navigateByUrl(`games/game/${gameId}`);
  }
}
