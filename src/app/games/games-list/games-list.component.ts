import { Component, OnInit } from '@angular/core';
import { GamesService } from '../shared/games.service';
import { Observable, shareReplay } from 'rxjs';
import { Game } from '../shared/games-list.model';
import { LoadingService } from '../shared/loading.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss'],
})
export class GamesListComponent implements OnInit {
  items: any[] = [];
  filteredItems: any[] = [];
  searchQuery = '';
  loading$: Observable<boolean>;
  error = false;
  listOfGames$: Observable<Game[]>;
  constructor(private gamesService: GamesService, private loadingService: LoadingService) {
    this.listOfGames$ = this.gamesService.getListOfGames();
    this.loading$ = loadingService.isLoading$.pipe(shareReplay());
  }

  ngOnInit(): void {}

  getListOfGames() {
    this.listOfGames$ = this.gamesService.getListOfGames().pipe(

    );
  }

  goToDetail(item: any): void {}

  trackByFn(index: number, item: any): any {
    return item.id;
  }
}
