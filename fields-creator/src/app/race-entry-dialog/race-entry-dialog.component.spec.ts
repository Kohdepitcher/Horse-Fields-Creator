import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceEntryDialogComponent } from './race-entry-dialog.component';

describe('RaceEntryDialogComponent', () => {
  let component: RaceEntryDialogComponent;
  let fixture: ComponentFixture<RaceEntryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaceEntryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceEntryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
