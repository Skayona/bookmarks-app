import {
  AddBookmark,
  BookmarkAdded,
  BookmarkDeleted,
  BookmarksError,
  BookmarksLoaded,
  ClearBookmark,
  DeleteBookmark,
  GetBookmarks,
  SetBookmark
} from '../actions/bookmarks.actions';
import { Bookmark } from '../models/bookmarks';
import * as fromReducer from './bookmarks.reducer';
import { BookmarksReducerState } from './bookmarks.reducer';

describe('BookmarksReducer', () => {
  const bookmark: Bookmark = {
    id: 1,
    name: 'testBookmark',
    url: 'testLink',
    group: 'testGroup'
  };

  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.bookmarksReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('GetBookmarks action', () => {
    it('should loading bookmarks and update the state in an immutable way', () => {
      const { initialState } = fromReducer;
      const newState: BookmarksReducerState = {
        ...initialState,
        loading: true,
      };
      const action = GetBookmarks();
      const state = fromReducer.bookmarksReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('BookmarksLoaded action', () => {
    it('should get all bookmarks and update the state in an immutable way', () => {
      const { initialState } = fromReducer;
      const newState: BookmarksReducerState = {
        ...initialState,
        bookmarks: [bookmark]
      };
      const action = BookmarksLoaded({ bookmarks: newState.bookmarks });
      const state = fromReducer.bookmarksReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('BookmarksError action', () => {
    it('should get bookmarks loading error and update the state in an immutable way', () => {
      const { initialState } = fromReducer;
      const newState: BookmarksReducerState = {
        ...initialState,
        error: true
      };
      const action = BookmarksError({ err: newState.error });
      const state = fromReducer.bookmarksReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('SetBookmark action', () => {
    it('should save bookmark and update the state in an immutable way', () => {
      const { initialState } = fromReducer;
      const newState: BookmarksReducerState = {
        ...initialState,
        bookmark
      };
      const action = SetBookmark({ bookmark });
      const state = fromReducer.bookmarksReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('ClearBookmark action', () => {
    it('should clear bookmark and update the state in an immutable way', () => {
      const { initialState } = fromReducer;
      const newState: BookmarksReducerState = {
        ...initialState,
        bookmark: null
      };
      const action = ClearBookmark();
      const state = fromReducer.bookmarksReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('AddBookmark action', () => {
    it('should new bookmark adding and update the state in an immutable way', () => {
      const { initialState } = fromReducer;
      const newState: BookmarksReducerState = {
        ...initialState,
        loading: true
      };
      const action = AddBookmark({ bookmark });
      const state = fromReducer.bookmarksReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('BookmarkAdded action', () => {
    it('should new bookmark added and update the state in an immutable way', () => {
      const { initialState } = fromReducer;
      const newState: BookmarksReducerState = {
        ...initialState,
        bookmarks: [
          ...initialState.bookmarks,
          bookmark
        ]
      };
      const action = BookmarkAdded({ bookmark });
      const state = fromReducer.bookmarksReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('DeleteBookmark action', () => {
    it('should delete bookmark and update the state in an immutable way', () => {
      const { initialState } = fromReducer;
      const newState: BookmarksReducerState = {
        ...initialState,
        loading: true
      };
      const action = DeleteBookmark({ id: 1 });
      const state = fromReducer.bookmarksReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('BookmarkDeleted action', () => {
    it('should update the state in an immutable way after bookmark deleted', () => {
      const { initialState } = fromReducer;
      const newState: BookmarksReducerState = {
        ...initialState,
        bookmarks: initialState.bookmarks.filter(({ id }) => id !== 1)
      };
      const action = BookmarkDeleted({ id: 1 });
      const state = fromReducer.bookmarksReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });
});
