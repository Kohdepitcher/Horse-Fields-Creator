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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'fields-creator';

  races = new BehaviorSubject<Race[]>([]);

  displayedColumns = ["number", "barrier", "name", "jockey", "weight"];

  //table datasource
  dataSource: MatTableDataSource<RaceEntry> | any

  selectedRace: number = 0

  constructor(private raceModel: FieldsService, private dialog: MatDialog) {}

  ngOnInit() {
    this.raceModel.subscribe(this.races);

    // this.raceModel.addRaceEntry(17,1,1,"test","test", 34)

  }

  //called when the race selector selects a race
  loadRaceEntries(event: MatSelectChange) {

    console.log(event.value);

    //set the select race to the race number from select value
    this.selectedRace = event.value

    //get the race from the model
    const race = this.raceModel.getRace(event.value)

    console.log(race.entries)

    //set the datasource for the table to the race's entries
    this.dataSource = new MatTableDataSource(race.entries)
    

  }

  

  openRaceDialog(shouldEdit: boolean): void {

    const fetchedRace: Race = this.raceModel.getRace(this.selectedRace)
     
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

  deleteRace() {
    this.raceModel.deleteRace(this.selectedRace)
  }
}


