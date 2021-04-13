import {
  selectBookmarks,
  selectBookmark,
  selectBookmarksError,
  selectBookmarksLoading,
  selectBookmarksState,
  AppState
} from '.';
import { Bookmark } from './models/bookmarks';

describe('Selectors', () => {
  const bookmark: Bookmark = {
    id: 1,
    name: 'testBookmark',
    url: 'testLink',
    group: 'testGroup'
  };

  const initialState: AppState = {
    bookmarksState: {
      bookmarks: [bookmark],
      bookmark,
      loading: true,
      error: false,
    }
  };

  const { bookmarksState } = initialState;

  it('should select the bookmarks state', () => {
    const result = selectBookmarksState(initialState);
    expect(result).toEqual(initialState.bookmarksState);
  });

  it('should select the bookmarks list', () => {
    const result = selectBookmarks.projector(bookmarksState, bookmarksState.bookmarks);
    expect(result.length).toEqual(1);
    expect(result[0].id).toEqual(1);
  });

  it('should select the bookmark', () => {
    const result = selectBookmark.projector(bookmarksState, bookmarksState.bookmark);
    expect(result.id).toEqual(1);
  });

  it('should select loading bookmarks', () => {
    const result = selectBookmarksLoading.projector(bookmarksState, bookmarksState.loading);
    expect(result).toBeTrue();
  });

  it('should select bookmarks error', () => {
    const result = selectBookmarksError.projector(bookmarksState, bookmarksState.error);
    expect(result).toBeFalse();
  });
});
