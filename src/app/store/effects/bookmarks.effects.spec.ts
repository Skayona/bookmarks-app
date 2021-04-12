import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { BookmarksService } from 'src/app/services/bookmarks.service';
import { BookmarksEffects } from './bookmarks.effects';
import * as fromReducer from '../reducers/bookmarks.reducer';
import { Bookmark } from '../models/bookmarks';
import { BookmarksActions } from '../actions/bookmarks.actions';
import { cold, getTestScheduler, hot } from 'jasmine-marbles';

describe('BookmarksEffects', () => {
  let actions$ = new Observable<BookmarksActions>();
  let bookmarksEffects;

  const { initialState } = fromReducer;
  const fakeBookmarksService = jasmine.createSpyObj(['getBookmarks']);
  const bookmark: Bookmark = {
    id: 1,
    name: 'testBookmark',
    url: 'testLink',
    group: 'testGroup'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BookmarksEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
        { provide: BookmarksService, useValue: fakeBookmarksService }
      ],
    });

    bookmarksEffects = TestBed.inject(BookmarksEffects);
  });

  it('should be created', () => {
    expect(bookmarksEffects).toBeTruthy();
  });

  describe('getBookmarks$', () => {
    it('should load bookmarks to be successful', () => {
      actions$ = hot('-a', { a: { type: BookmarksActions.GetBookmarks }});
      fakeBookmarksService.getBookmarks.and.returnValue(
        cold('-a', { a: [bookmark] })
      );
      const expected = hot('--a', {
        a: {
          type: BookmarksActions.BookmarksLoaded,
          bookmarks: [bookmark],
        },
      });
      expect(bookmarksEffects.getBookmarks$).toBeObservable(expected);
    });

    xit('should load bookmarks to be failed', () => {
    });
  });

  describe('addBookmark$', () => {
    it('should create new bookmark', () => {
      actions$ = hot('-a', { a: { type: BookmarksActions.AddBookmark, bookmark }});
      const expected = hot('-a', {
        a: {
          type: BookmarksActions.BookmarkAdded,
          bookmark
        },
      });
      expect(bookmarksEffects.addBookmark$).toBeObservable(expected);
    });
  });

  describe('deleteBookmark$', () => {
    it('should delete bookmark', () => {
      actions$ = hot('-a', { a: { type: BookmarksActions.DeleteBookmark, id: 1 }});
      const expected = hot('-a', {
        a: {
          type: BookmarksActions.BookmarkDeleted,
          id: 1
        },
      });
      expect(bookmarksEffects.deleteBookmark$).toBeObservable(expected);
    });
  });
});
