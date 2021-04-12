import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Bookmark } from 'src/app/store/models/bookmarks';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit {
  @Input() name: string;
  @Input() list: Bookmark[];

  @Output() bookmarkRedirectHandler: EventEmitter<Bookmark> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  redirectHandler(e: Event, bookmark: Bookmark): void {
    e.preventDefault();
    this.bookmarkRedirectHandler.emit(bookmark);
  }

}
