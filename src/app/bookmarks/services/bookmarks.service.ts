import { Injectable } from '@angular/core';
import { Bookmark } from '../store/models/bookmarks';
import { from, Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable()
export class BookmarksService {

  constructor(
    private db: AngularFireDatabase,
  ) { }

  getBookmarks(): Observable<Bookmark[]> {
    return from(this.db.list<any>('data').query.once('value')
      .then((res) => res.val())
      .then((data: { [key: string]: Bookmark }) =>
        Object.entries(data).map((item: [string, Bookmark]) => ({ ...item[1], dataKey: item[0] }))
      )
    );
  }

  addBookmark(bookmark: Bookmark): Observable<any> {
    return from(this.db.list<any>('data').push(bookmark));
  }

  deleteBookmark(dataKey: string): Observable<any> {
    return from(this.db.list<any>(`data/${ dataKey }`).remove());
  }
}
