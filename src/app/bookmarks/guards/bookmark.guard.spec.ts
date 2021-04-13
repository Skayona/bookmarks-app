import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';
import { map, pluck } from 'rxjs/operators';
import { selectBookmark } from '../store';
import { Bookmark } from '../store/models/bookmarks';
import { BookmarkGuard } from './bookmark.guard';

describe('BookmarkGuard', () => {
  let guard: BookmarkGuard;
  let store: MockStore;
  const initialState = { bookmark: null };
  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        BookmarkGuard,
        provideMockStore({ initialState }),
        { provide: Router, useValue: router }
      ]
    });
    store = TestBed.inject(MockStore);
    guard = TestBed.inject(BookmarkGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return false if the bookmark state is empty', () => {
    guard.bookmark$ = store.pipe(pluck('bookmark'));
    const result = guard.canActivate();
    const expected = cold('a', { a: false });
    expect(result).toBeObservable(expected);
  });

  it('should return true if the bookmark state has value', () => {
    const bookmark: Bookmark[] = [{
      id: 1,
      name: 'testBookmark',
      url: 'testLink',
      group: 'testGroup'
    }];
    store.setState({ bookmark });
    guard.bookmark$ = store.pipe(pluck('bookmark'));
    const expected = cold('a', { a: true });
    router.navigate(['/bookmarks']);
    expect(guard.canActivate()).toBeObservable(expected);
  });
});
