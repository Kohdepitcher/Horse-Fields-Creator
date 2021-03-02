import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  EmailValidator,
} from '@angular/forms';

@Component({
  selector: 'app-race-dialog',
  template: `
    <h1 mat-dialog-title>{{ data.isNew? 'New Race' : 'Edit Race'}}</h1>

    <form [formGroup]="raceForm">

    <div mat-dialog-content>

    <mat-form-field appearance="fill">
      <mat-label>Date</mat-label>
        <input matInput [matDatepicker]="picker" formControlName='date' type="date" [(ngModel)]="data.race.date">
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
        <mat-error *ngIf="hasError('date', 'required')">Date is required</mat-error>
    </mat-form-field>

    <mat-form-field appearance="fill">
      <mat-label>Race Name</mat-label>
        <input matInput formControlName='name' type="text" [(ngModel)]="data.race.name">
        <mat-error *ngIf="hasError('name', 'required')">Name is required</mat-error>
    </mat-form-field>

    </div>

    <div mat-dialog-actions>
  <button mat-button (click)="onNoClick()">Cancel</button>
  <button mat-button  [mat-dialog-close]="data" cdkFocusInitial color="primary">
  {{ data.isNew? 'Create' : 'Update'}}
  </button>
  
  </div>
</form>
  `,
  styles: [
  ]
})
export class RaceDialogComponent implements OnInit {

  raceForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<RaceDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.raceForm = this.fb.group({
      
        name: [this.data.race.name, Validators.required],
        date: [this.data.race.date, Validators.required]

    })

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.raceForm.controls[controlName].hasError(errorName);
  }

}
