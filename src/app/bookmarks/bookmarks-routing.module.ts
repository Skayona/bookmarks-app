import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarkGuard } from 'src/app/bookmarks/guards/bookmark.guard';
import { BookmarksListComponent } from './pages/bookmarks-list/bookmarks-list.component';
import { BookmarkComponent } from './pages/bookmark/bookmark.component';
import { BookmarksComponent } from './bookmarks.component';

const routes: Routes = [{
  path: '',
  component: BookmarksComponent,
  children: [{
    path: '',
    pathMatch: 'full',
    component: BookmarksListComponent,
  }, {
    path: ':id',
    component: BookmarkComponent,
    canActivate: [BookmarkGuard]
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookmarksRoutingModule { }
