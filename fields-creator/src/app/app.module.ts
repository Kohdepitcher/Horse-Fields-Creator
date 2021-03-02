import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

//material imports
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from'@angular/material/icon';
import {MatButtonModule} from "@angular/material/button";
import {MatChipsModule} from '@angular/material/chips';
import { MatTableModule } from "@angular/material/table";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatMenuModule } from "@angular/material/menu";
import { RaceDialogComponent } from './race-dialog/race-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import {MatInputModule} from '@angular/material/input';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';
import { RaceEntryDialogComponent } from './race-entry-dialog/race-entry-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    RaceDialogComponent,
    RaceEntryDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
