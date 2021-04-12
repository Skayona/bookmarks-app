import {
  createAction,
  props
} from '@ngrx/store';
import { Bookmark } from '../models/bookmarks';

export enum BookmarksActions {
  GetBookmarks = '[Get Bookmarks]',
  BookmarksLoaded = '[Bookmarks Loaded]',
  BookmarksError = '[Bookmarks Error]',
  GetBookmark = '[Get Bookmark]',
  SetBookmark = '[Set Bookmark]',
  ClearBookmark = '[Clear Bookmark]',
  AddBookmark = '[Add Bookmark]',
  BookmarkAdded = '[Bookmark Added]',
  DeleteBookmark = '[Delete Bookmark]',
  BookmarkDeleted = '[Bookmark Deleted]'
}

export const GetBookmarks = createAction(
  BookmarksActions.GetBookmarks
);

export const BookmarksLoaded = createAction(
  BookmarksActions.BookmarksLoaded,
  props<{ bookmarks: Bookmark[] }>()
);

export const BookmarksError = createAction(
  BookmarksActions.BookmarksError,
  props<{ err: any }>()
);

export const SetBookmark = createAction(
  BookmarksActions.SetBookmark,
  props<{ bookmark: Bookmark }>()
);

export const GetBookmark = createAction(
  BookmarksActions.GetBookmark
);

export const ClearBookmark = createAction(
  BookmarksActions.ClearBookmark
);

export const AddBookmark = createAction(
  BookmarksActions.AddBookmark,
  props<{ bookmark: Bookmark }>()
);

export const BookmarkAdded = createAction(
  BookmarksActions.BookmarkAdded,
  props<{ bookmark: Bookmark }>()
);

export const DeleteBookmark = createAction(
  BookmarksActions.DeleteBookmark,
  props<{ id: number }>()
);

export const BookmarkDeleted = createAction(
  BookmarksActions.BookmarkDeleted,
  props<{ id: number }>()
);
