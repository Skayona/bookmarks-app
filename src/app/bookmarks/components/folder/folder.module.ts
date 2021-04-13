import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderComponent } from './folder.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    FolderComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
  ],
  exports: [
    FolderComponent
  ]
})
export class FolderModule { }
