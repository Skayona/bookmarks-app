import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState, selectBookmark } from '../store';
import { Bookmark } from '../store/models/bookmarks';

@Injectable({
  providedIn: 'root'
})
export class BookmarkGuard implements CanActivate {
  bookmark$: Observable<Bookmark>;

  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) {
    this.bookmark$ = store.select(selectBookmark);
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.bookmark$.pipe(
        map((res) => {
          if (Boolean(res)) {
            return true;
          }
          this.router.navigate(['/bookmarks']);
          return false;
        })
      );
  }

}
