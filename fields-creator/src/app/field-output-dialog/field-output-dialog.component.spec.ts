import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldOutputDialogComponent } from './field-output-dialog.component';

describe('FieldOutputDialogComponent', () => {
  let component: FieldOutputDialogComponent;
  let fixture: ComponentFixture<FieldOutputDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldOutputDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldOutputDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
