import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBookmarkComponent } from './add-bookmark.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    AddBookmarkComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule
  ],
  exports: [
    AddBookmarkComponent
  ]
})
export class AddBookmarkModule { }
