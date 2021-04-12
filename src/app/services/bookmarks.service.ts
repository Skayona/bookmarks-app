import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bookmark } from '../store/models/bookmarks';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BookmarksService {

  constructor(private http: HttpClient) { }

  getBookmarks(): Observable<Bookmark[]> {
    return this.http.get<any>('../../assets/data/bookmarks.json').pipe(
      map(({ data }) => data)
    );
  }
}
