import { Action, createReducer, on } from '@ngrx/store';
import {
  AddBookmark,
  BookmarkAdded,
  BookmarkDeleted,
  BookmarksError,
  BookmarksLoaded,
  ClearBookmark,
  DeleteBookmark,
  GetBookmarks,
  SetBookmark,
} from '../actions/bookmarks.actions';
import { Bookmark } from '../models/bookmarks';

export interface BookmarksReducerState {
  bookmarks: Bookmark[];
  bookmark: Bookmark;
  loading: boolean;
  error: boolean;
}

export const initialState: BookmarksReducerState = {
  bookmarks: [],
  bookmark: null,
  loading: false,
  error: false,
};

export const bookmarksReducerState = createReducer(initialState,
  on(GetBookmarks, (state) => {
    return {
      ...state,
      loading: true
    };
  }),
  on(BookmarksLoaded, (state, payload) => {
    const { bookmarks } = payload;
    return {
      ...state,
      loading: false,
      bookmarks
    };
  }),
  on(BookmarksError, (state, payload) => {
    return {
      ...state,
      loading: false,
      error: payload.err
    };
  }),
  on(SetBookmark, (state, payload) => {
    return {
      ...state,
      bookmark: payload.bookmark
    };
  }),
  on(ClearBookmark, (state) => {
    return {
      ...state,
      bookmark: null
    };
  }),
  on(AddBookmark, (state) => {
    return {
      ...state,
      loading: true
    };
  }),
  on(BookmarkAdded, (state, payload) => {
    const bookmarks = [
      ...state.bookmarks,
      payload.bookmark
    ];
    return {
      ...state,
      loading: false,
      bookmarks
    };
  }),
  on(DeleteBookmark, (state) => {
    return {
      ...state,
      loading: true
    };
  }),
  on(BookmarkDeleted, (state, payload) => {
    return {
      ...state,
      loading: false,
      bookmarks: state.bookmarks.filter(({ id }) => id !== payload.id)
    };
  })
);

export function bookmarksReducer(state = initialState, action: Action): BookmarksReducerState {
  return bookmarksReducerState(state, action);
}
