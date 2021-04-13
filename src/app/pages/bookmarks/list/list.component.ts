import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppState, selectBookmarks } from 'src/app/store';
import { SetBookmark } from 'src/app/store/actions/bookmarks.actions';
import { Bookmark } from 'src/app/store/models/bookmarks';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  private alive$ = new Subject();
  bookmarks$: Observable<Bookmark[]>;

  bookmarks: { [key: string]: Bookmark[] } = {};
  groups: string[] = [];

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.bookmarks$ = store.select(selectBookmarks);
  }

  ngOnInit(): void {
    this.bookmarks$.pipe(
      takeUntil(this.alive$)
    ).subscribe((bookmarks) => {
      this.groups = [...new Set(bookmarks.map(({ group }) => group))];
      this.groups.forEach((group) => {
        const filteredBookmarks = bookmarks.filter((bookmark) => bookmark.group === group);
        this.bookmarks[group] = filteredBookmarks;
      });
    });
  }

  ngOnDestroy(): void {
    this.alive$.next();
    this.alive$.unsubscribe();
  }

  redirectHandler(bookmark: Bookmark): void {
    this.store.dispatch(SetBookmark({ bookmark }));
    this.router.navigate(['./', bookmark.id], { relativeTo: this.route });
  }
}
