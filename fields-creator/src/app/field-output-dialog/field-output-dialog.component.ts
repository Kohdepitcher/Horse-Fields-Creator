import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-field-output-dialog',
  preserveWhitespaces: true,
  template: `
  <h1 mat-dialog-title>Export</h1>

  <div mat-dialog-content>
    <div ngPreserveWhitespaces style="white-space: pre-line; " [innerHTML]="data"></div>
  </div>

  <div mat-dialog-actions>
  <button mat-button (click)="onNoClick()">OK</button>
  </div>


  `,
  styles: [
  ]
})
export class FieldOutputDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FieldOutputDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
