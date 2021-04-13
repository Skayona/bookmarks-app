import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AddBookmarkComponent } from './add-bookmark.component';

describe('AddBookmarkComponent', () => {
  let component: AddBookmarkComponent;
  let fixture: ComponentFixture<AddBookmarkComponent>;

  const fakeMatDialogValue = jasmine.createSpyObj(['close']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBookmarkComponent ],
      imports: [
        ReactiveFormsModule,
        MatSelectModule,
        MatInputModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: fakeMatDialogValue },
        { provide: MAT_DIALOG_DATA, useValue: { data: { groups: ['test-group'] }}}
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should prevent to close dialog on submit if form is invalid', () => {
    const event = new Event('click');
    spyOn(component, 'onSubmit').and.callThrough();
    spyOn(event, 'preventDefault');
    component.onSubmit(event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(component.onSubmit).toHaveBeenCalledWith(event);
    expect(component.form.invalid).toBeTrue();
    fakeMatDialogValue.close(component.form.value);
    expect(fakeMatDialogValue.close).toHaveBeenCalled();
  });

  it('should close dialog on submit if form is valid', () => {
    component.form.setValue({
      name: 'test name',
      url: 'https://test.com',
      group: 'test group',
      newGroup: ''
    });
    const event = new Event('click');
    spyOn(component, 'onSubmit').and.callThrough();
    spyOn(event, 'preventDefault');
    component.onSubmit(event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(component.onSubmit).toHaveBeenCalledWith(event);
    expect(component.form.invalid).toBeFalse();
    fakeMatDialogValue.close(component.form.value);
    expect(fakeMatDialogValue.close).toHaveBeenCalledWith(component.form.value);
  });
});
