import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarksModule } from './bookmarks/bookmarks.module';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'bookmarks'
}, {
  path: 'bookmarks',
  loadChildren: () => BookmarksModule,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
