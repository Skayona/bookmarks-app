import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { AddBookmarkComponent } from './add-bookmark.component';

describe('AddBookmarkComponent', () => {
  let component: AddBookmarkComponent;
  let fixture: ComponentFixture<AddBookmarkComponent>;

  const fakeMatDialogValue = jasmine.createSpyObj(['close']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBookmarkComponent ],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: fakeMatDialogValue }
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
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
      group: 'test group'
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
