import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BookmarksService } from 'src/app/services/bookmarks.service';
import {
  AddBookmark,
  BookmarkAdded,
  BookmarkDeleted,
  BookmarksError,
  BookmarksLoaded,
  DeleteBookmark,
  GetBookmarks,
} from '../actions/bookmarks.actions';
import { Bookmark } from '../models/bookmarks';


@Injectable()
export class BookmarksEffects {
  getBookmarks$ = createEffect(() => this.actions$.pipe(
    ofType(GetBookmarks.type),
    switchMap(() => this.bookmarksService.getBookmarks().pipe(
        map((bookmarks: Bookmark[]) => BookmarksLoaded({ bookmarks })),
        catchError((err) => of(BookmarksError(err)))
      ))
    ),
  );

  addBookmark$ = createEffect(() => this.actions$.pipe(
    ofType(AddBookmark.type),
    switchMap(({ bookmark }) => this.bookmarksService.addBookmark(bookmark).pipe(
      map(() => BookmarkAdded({ bookmark })),
      catchError((err) => of(BookmarksError(err)))
    ))
  ),
  );

  deleteBookmark$ = createEffect(() => this.actions$.pipe(
    ofType(DeleteBookmark.type),
    switchMap(({ dataKey }) => this.bookmarksService.deleteBookmark(dataKey).pipe(
      map(() => BookmarkDeleted({ dataKey })),
      catchError((err) => of(BookmarksError(err)))
    ))
  ));

  constructor(
    private actions$: Actions,
    private bookmarksService: BookmarksService
  ) {}
}

