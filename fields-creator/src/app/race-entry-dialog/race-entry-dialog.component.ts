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
    <p>
      race-entry-dialog works!
    </p>
  `,
  styles: [
  ]
})
export class RaceEntryDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
