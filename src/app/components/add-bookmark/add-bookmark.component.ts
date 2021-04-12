import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-bookmark',
  templateUrl: './add-bookmark.component.html',
  styleUrls: ['./add-bookmark.component.scss']
})
export class AddBookmarkComponent implements OnInit {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddBookmarkComponent>,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      name: ['', Validators.required],
      url: ['', [Validators.required, Validators.pattern(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,10}\b([-a-zA-Z0-9@:%_\+.~#?!&//=]*)/)]],
      group: ['', Validators.required],
    });
   }

  ngOnInit(): void {
  }

  onSubmit(e: Event): void {
    e.preventDefault();
    if (this.form.invalid) {
      return;
    }
    this.dialogRef.close({...this.form.value });
  }
}
