import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSub$ = new BehaviorSubject<boolean>(false);

  isLoading$ = this.loadingSub$.asObservable();

  constructor() {}

  startLoading() {
    this.loadingSub$.next(true);
  }

  stopLoading() {
    this.loadingSub$.next(false);
  }
}
