import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { AddBookmarkComponent } from 'src/app/components/add-bookmark/add-bookmark.component';
import { AppState, selectBookmarks, selectBookmarksLoading } from 'src/app/store';
import { AddBookmark, GetBookmarks } from 'src/app/store/actions/bookmarks.actions';
import { Bookmark } from 'src/app/store/models/bookmarks';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit, OnDestroy {
  private alive$ = new Subject();
  isLoading$: Observable<boolean> = of(true);

  isHomePage = true;
  groups: string[] = [];

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog,
    private router: Router
  ) {
    store.dispatch(GetBookmarks());
    router.events.pipe(
      takeUntil(this.alive$),
      filter((event) => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.urlAfterRedirects  === '/bookmarks'),
    ).subscribe((isHomePage) => {
      this.isHomePage = isHomePage;
    });
    this.isLoading$ = store.select(selectBookmarksLoading);

    const bookmarks$ = store.select(selectBookmarks);
    bookmarks$.pipe(
      takeUntil(this.alive$)
    ).subscribe((bookmarks) => {
      this.groups = [...new Set(bookmarks.map(({ group }) => group))];
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.alive$.next();
    this.alive$.unsubscribe();
  }

  addBookmarkHandler(): void {
    const dialogRef = this.dialog.open(AddBookmarkComponent, {
      data: {
        groups: this.groups
      }
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        const bookmark: Bookmark = {
          ...data,
          id: (new Date()).getTime()
        };
        this.store.dispatch(AddBookmark({ bookmark }));
        this.router.navigate(['./bookmarks']);
      }
    });
  }
 }
