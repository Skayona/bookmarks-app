import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectBookmark } from 'src/app/store';
import { ClearBookmark, DeleteBookmark, GetBookmark } from 'src/app/store/actions/bookmarks.actions';
import { Bookmark } from 'src/app/store/models/bookmarks';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})
export class BookmarkComponent implements OnInit, OnDestroy {
  bookmark$: Observable<Bookmark>;

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog,
    private router: Router
  ) {
    store.dispatch(GetBookmark());
    this.bookmark$ = store.select(selectBookmark);
   }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.store.dispatch(ClearBookmark());
  }

  handleDelete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm delete current bookmark'
      }
    });

    dialogRef.afterClosed().subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.store.dispatch(DeleteBookmark({ id }));
        this.router.navigate(['./bookmarks']);
      }
    });
  }
}
