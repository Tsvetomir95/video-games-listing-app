import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GamesService } from '../shared/games.service';
import {
  Observable,
  Subject,
  concatMap,
  debounceTime,
  distinctUntilChanged,
  finalize,
  first,
  fromEvent,
  map,
  of,
  shareReplay,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { Game } from '../shared/games-list.model';
import { LoadingService } from '../shared/loading.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesListComponent implements  AfterViewInit, OnDestroy {
  searchQuery = '';
  loading$: Observable<boolean>;
  error = false;
  listOfGames$: Observable<Game[]>;
  private unsubscribe$ = new Subject<void>()
  @ViewChild('input') input!: ElementRef;

  constructor(
    private gamesService: GamesService,
    private loadingService: LoadingService,
    private router: Router
  ) {
    this.listOfGames$ = this.gamesService.gameList$;
    this.loading$ = this.loadingService.isLoading$;
  }


  ngAfterViewInit(): void {
    this.searchGameByQuery();
  }
  getListOfGames() {
    this.listOfGames$ = this.gamesService.getListOfGames().pipe();
  }

  searchGameByQuery() {
    fromEvent(this.input.nativeElement, 'keyup')
    .pipe(
      takeUntil(this.unsubscribe$),
      debounceTime(2000),
      distinctUntilChanged(),
      concatMap((res) =>
        this.gamesService
          .searchGamesByQuery(this.searchQuery)
          .pipe(tap(res => this.gamesService.setGamesList(res), ))
      )
    )
    .subscribe();
  }

  trackByFn(index: number, item: any): any {
    return item.id;
  }
  ngOnDestroy(): void {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
  }
}
