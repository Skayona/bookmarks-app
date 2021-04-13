import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-bookmark',
  templateUrl: './add-bookmark.component.html',
  styleUrls: ['./add-bookmark.component.scss']
})
export class AddBookmarkComponent implements OnInit {
  form: FormGroup;
  createNewOpt = 'create-new';
  isCreateNewGroupEnable = false;

  constructor(
    public dialogRef: MatDialogRef<AddBookmarkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { groups: string[] },
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      name: ['', Validators.required],
      url: ['', [Validators.required, Validators.pattern(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,10}\b([-a-zA-Z0-9@:%_\+.~#?!&//=]*)/)]],
      group: ['', Validators.required],
      newGroup: [''],
    });
   }

  ngOnInit(): void {
    this.form.get('group').valueChanges.subscribe((value) => {
      this.isCreateNewGroupEnable = value === this.createNewOpt;
      this.isCreateNewGroupEnable
        ? this.form.get('newGroup').setValidators([Validators.required])
        : this.form.get('newGroup').clearValidators();
      this.form.get('newGroup').updateValueAndValidity();
    });
  }

  onSubmit(e: Event): void {
    e.preventDefault();
    if (this.form.invalid) {
      return;
    }
    const data = this.isCreateNewGroupEnable ? {
      ...this.form.value,
      group: this.form.get('newGroup').value
    } : { ...this.form.value };
    delete data.newGroup;
    this.dialogRef.close(data);
  }
}
