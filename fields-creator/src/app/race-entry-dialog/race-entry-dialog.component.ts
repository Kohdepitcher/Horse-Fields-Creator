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
  selector: 'app-race-entry-dialog',
  template: `
    <h1 mat-dialog-title>{{ data.isNew? 'New Race Entry' : 'Edit Race Entry'}}</h1>

<form [formGroup]="raceEntryForm">

<div mat-dialog-content>

<mat-form-field appearance="fill">
  <mat-label>Horse No.</mat-label>
    <input matInput formControlName='number' type="text" [(ngModel)]="data.raceEntry.horseNumber" pattern="[0-9]">
    <mat-error *ngIf="hasError('number', 'required')">Horse number is required</mat-error>
    <mat-error *ngIf="hasError('number', 'pattern')">Horse number is not a valid number</mat-error>
</mat-form-field>

<mat-form-field appearance="fill">
  <mat-label>Barrier No.</mat-label>
    <input matInput formControlName='barrier' type="text" [(ngModel)]="data.raceEntry.barrierNumber" pattern="[0-9]"ß>
    <mat-error *ngIf="hasError('barrier', 'required')">Barrier number is required</mat-error>
</mat-form-field>

<mat-form-field appearance="fill">
  <mat-label>Horse Name</mat-label>
    <input matInput formControlName='name' type="text" [(ngModel)]="data.raceEntry.horseName">
    <mat-error *ngIf="hasError('name', 'required')">Name is required</mat-error>
</mat-form-field>

<mat-form-field appearance="fill">
  <mat-label>Jockey</mat-label>
    <input matInput formControlName='jockey' type="text" [(ngModel)]="data.raceEntry.jockeyName">
    <mat-error *ngIf="hasError('jockey', 'required')">Jockey is required</mat-error>
</mat-form-field>

<mat-form-field appearance="fill">
  <mat-label>Weight (Kg)</mat-label>
    <input matInput formControlName='weight' type="text" [(ngModel)]="data.raceEntry.weight" pattern="[0-9]">
    <mat-error *ngIf="hasError('weight', 'required')">Weight is required</mat-error>
</mat-form-field>


</div>

<div mat-dialog-actions>
<button mat-button (click)="onNoClick()">Cancel</button>
<button mat-button  [mat-dialog-close]="data" cdkFocusInitial [disabled]="!raceEntryForm.valid" color="primary">
{{ data.isNew? 'Create' : 'Update'}}
</button>

</div>
</form>
  `,
  styles: [
    '.mat-form-field { width: 100%; margin-bottom: 1em }'
  ]
})
export class RaceEntryDialogComponent implements OnInit {

  raceEntryForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<RaceEntryDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.raceEntryForm = this.fb.group({
      
      number: [this.data.raceEntry.horseNumber, Validators.required, Validators.pattern("^[0-9]*$")],
      barrier: [this.data.raceEntry.barrierNumber, Validators.required, Validators.pattern("^[0-9]*$")],
      name: [this.data.raceEntry.horseName, Validators.required],
      jockey: [this.data.raceEntry.jockeyName, Validators.required],
      weight: [this.data.raceEntry.weight, Validators.required, Validators.pattern("^[0-9]*$")]

  })

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.raceEntryForm.controls[controlName].hasError(errorName);
  }

}

export class CustomValidator{
  // Number only validation
  static numeric(control: AbstractControl) {
    let val = control.value;
    
    if (val === null || val === '') return null;
    
    if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) return { 'invalidNumber': true };
    
    return null;
  }
}
