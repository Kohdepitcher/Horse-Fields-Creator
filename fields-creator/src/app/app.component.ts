import { Component, OnInit } from '@angular/core';

//
import { Race, RaceEntry, FieldsService } from "./fields.service";

import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatTableDataSource, MatTable } from '@angular/material/table';

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

  constructor(private raceModel: FieldsService) {}

  ngOnInit() {
    this.raceModel.subscribe(this.races);

    // this.raceModel.addRaceEntry(17,1,1,"test","test", 34)

  }

  //called when the race selector selects a race
  loadRaceEntries(event: MatSelectChange) {

    console.log(event.value);

    //get the race from the model
    const race = this.raceModel.getRace(event.value)

    console.log(race.entries)

    //set the datasource for the table to the race's entries
    this.dataSource = new MatTableDataSource(race.entries)
    

  }
}


