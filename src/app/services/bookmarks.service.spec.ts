import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Bookmark } from '../store/models/bookmarks';

import { BookmarksService } from './bookmarks.service';


describe('BookmarksService', () => {
  let injector: TestBed;
  let service: BookmarksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        BookmarksService
      ]
    });
    injector = getTestBed();
    service = TestBed.inject(BookmarksService);
    httpMock = injector.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable<Bookmark[]>', () => {
    const bookmarkMock: Bookmark[] = [{
      id: 1,
      name: 'testBookmark',
      url: 'testLink',
      group: 'testGroup'
    }];

    service.getBookmarks().subscribe((bookmarks: Bookmark[]) => {
      expect(bookmarks.length).toBe(1);
      expect(bookmarks).toEqual(bookmarkMock);
    });

    const req = httpMock.expectOne(() => true);
    expect(req.request.method).toBe('GET');
    req.flush({ data: bookmarkMock });
  });
});
