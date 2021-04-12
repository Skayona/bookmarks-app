import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookmarksRoutingModule } from './bookmarks-routing.module';
import { BookmarksComponent } from './bookmarks.component';
import { FolderModule } from 'src/app/components/folder/folder.module';
import { ListComponent } from './list/list.component';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { ConfirmDialogModule } from 'src/app/components/confirm-dialog/confirm-dialog.module';
import { AddBookmarkModule } from 'src/app/components/add-bookmark/add-bookmark.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    BookmarksComponent,
    ListComponent,
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
