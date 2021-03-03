import { Component, OnInit } from '@angular/core';

//
import { Race, RaceEntry, FieldsService } from "./fields.service";

import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatTableDataSource, MatTable } from '@angular/material/table';

//dialogs
import { RaceDialogComponent } from "./race-dialog/race-dialog.component";
import { MatDialog } from '@angular/material/dialog';
import { RaceEntryDialogComponent } from './race-entry-dialog/race-entry-dialog.component';
import { FieldOutputDialogComponent } from './field-output-dialog/field-output-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'fields-creator';

  races = new BehaviorSubject<Race[]>([]);

  displayedColumns = ["number", "barrier", "name", "jockey", "weight", "action"];

  //table datasource
  dataSource: MatTableDataSource<RaceEntry> | any

  selectedRace: number = 0

  constructor(private raceModel: FieldsService, private dialog: MatDialog) {}

  ngOnInit() {
    this.raceModel.subscribe(this.races);
  }

  //called when the race selector selects a race
  loadRaceEntries(event: MatSelectChange) {

    //set the select race to the race number from select value
    this.selectedRace = event.value

    //get the race from the model
    const race = this.raceModel.getRace(event.value)

    console.log(race.entries)

    //set the datasource for the table to the race's entries
    this.dataSource = new MatTableDataSource(race.entries)
    

  }

  

  //opens teh race dialog
  openRaceDialog(shouldEdit: boolean): void {

    var fetchedRace!: any

    if(shouldEdit) {
      fetchedRace = this.raceModel.getRace(this.selectedRace)
    } else {
      fetchedRace = undefined
    }

    
     
    const dialogRef = this.dialog.open(RaceDialogComponent, {
      width: '400px',
      data: fetchedRace != undefined  ? { race: {...fetchedRace} , isNew: false} : { race: {}, isNew: true}
    });

    dialogRef.afterClosed().subscribe(result => {

        if (result.isNew) {

          this.raceModel.addRace(result.race.date, result.race.name)

        }

        else if (result.isNew == false) {

          this.raceModel.updateRace(result.race.date, this.selectedRace, result.race.name)

        }

    })

  }


  //opens the race entry dialog
  openRacEntryeDialog(entryNumber: number) {

    var raceEntry!: any

    if(entryNumber == 0) {
      raceEntry = undefined
    } else {
      raceEntry = this.raceModel.getRaceEntriesForRace(this.selectedRace, entryNumber)
    }

    console.log(raceEntry);
    

    const dialogRef = this.dialog.open(RaceEntryDialogComponent, {
      width: '400px',
      data: raceEntry != undefined ? { raceEntry: {...raceEntry}, isNew: false} : { raceEntry: {}, isNew: true}
    })

    dialogRef.afterClosed().subscribe(result => {

        if (result.isNew) {
          this.raceModel.addRaceEntry(this.selectedRace, result.raceEntry.horseNumber, result.raceEntry.barrierNumber, result.raceEntry.horseName, result.raceEntry.jockeyName, result.raceEntry.weight)
        }

        else if (result.isNew == false) {
          this.raceModel.updateRaceEntry(this.selectedRace, result.raceEntry.horseNumber, result.raceEntry.barrierNumber, result.raceEntry.horseName, result.raceEntry.jockeyName, result.raceEntry.weight)
        }

        //refesh the datasource
        this.dataSource = new MatTableDataSource(this.raceModel.getRace(this.selectedRace).entries)

    })   

  }

  //deletes a race when called
  deleteRace() {

    //delete the selected race in the modal
    this.raceModel.deleteRace(this.selectedRace)

    //reset the selectedRace
    this.selectedRace = 0

    //set the datasource for the table to undfined to removed the now deleted race entries
    this.dataSource = undefined
  }

  //deletes a race entry when called
  deleteRaceEntry(entryNumber: number) {

    //delete a race entry for a race
    this.raceModel.deleteRaceEntry(this.selectedRace, entryNumber)

    //refesh the datasource to reload
    this.dataSource = new MatTableDataSource(this.raceModel.getRace(this.selectedRace).entries)
  }

  getExport() {
    const exportedFields = this.raceModel.exportToFileFormat();

    console.log(exportedFields)

    const dialogRef = this.dialog.open(FieldOutputDialogComponent, {
      width: '50%',
      data: exportedFields
    })
     
  }
}




