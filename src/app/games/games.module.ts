import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { GamesListComponent } from './games-list/games-list.component';
import { GamesDetailComponent } from './games-detail/games-detail.component';
import { GameComponent } from './game/game.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [GamesListComponent, GamesDetailComponent, GameComponent],
  imports: [CommonModule, GamesRoutingModule, FormsModule, ReactiveFormsModule],
})
export class GamesModule {}
