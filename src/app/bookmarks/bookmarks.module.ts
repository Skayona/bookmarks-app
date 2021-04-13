import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookmarksRoutingModule } from './bookmarks-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { AddBookmarkModule } from 'src/app/bookmarks/components/add-bookmark/add-bookmark.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BookmarksListComponent } from './pages/bookmarks-list/bookmarks-list.component';
import { BookmarkComponent } from './pages/bookmark/bookmark.component';
import { FolderModule } from './components/folder/folder.module';
import { ConfirmDialogModule } from '../components/confirm-dialog/confirm-dialog.module';
import { BookmarksComponent } from './bookmarks.component';


@NgModule({
  declarations: [
    BookmarksComponent,
    BookmarksListComponent,
    BookmarkComponent,
  ],
  imports: [
    CommonModule,
    BookmarksRoutingModule,
    FolderModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatChipsModule,
    ConfirmDialogModule,
    AddBookmarkModule,
    MatProgressSpinnerModule
  ],

})
export class BookmarksModule { }
