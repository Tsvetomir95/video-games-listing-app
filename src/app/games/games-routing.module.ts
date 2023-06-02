import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesListComponent } from './games-list/games-list.component';
import { GamesDetailComponent } from './games-detail/games-detail.component';

const routes: Routes = [
  {
    path: '',
    component: GamesListComponent,
  },
  {
    path: 'game/:id',
    component: GamesDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamesRoutingModule {}
