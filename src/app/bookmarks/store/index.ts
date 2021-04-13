import { createSelector } from '@ngrx/store';
import { BookmarksEffects } from './effects/bookmarks.effects';
import { bookmarksReducer, BookmarksReducerState } from './reducers/bookmarks.reducer';

export interface AppState {
  bookmarksState: BookmarksReducerState;
}

export const appEffects = [
  BookmarksEffects
];

export const appState = {
  bookmarksState: bookmarksReducer,
};

export const selectBookmarksState = (state: AppState) => state.bookmarksState;


// bookmarks
export const selectBookmarks = createSelector(
  selectBookmarksState,
  (state: BookmarksReducerState) => state.bookmarks
);

export const selectBookmark = createSelector(
  selectBookmarksState,
  (state: BookmarksReducerState) => state.bookmark
);

export const selectBookmarksError = createSelector(
  selectBookmarksState,
  (state: BookmarksReducerState) => state.error
);

export const selectBookmarksLoading = createSelector(
  selectBookmarksState,
  (state: BookmarksReducerState) => state.loading
);
