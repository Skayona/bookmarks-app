import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarkGuard } from 'src/app/guards/bookmark.guard';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { BookmarksComponent } from './bookmarks.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [{
  path: '',
  component: BookmarksComponent,
  children: [{
    path: '',
    pathMatch: 'full',
    component: ListComponent,
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
