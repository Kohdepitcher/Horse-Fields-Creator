import { Injectable } from '@angular/core';
import { BehaviorSubject, Observer } from 'rxjs';

//define race model
export interface Race {

  date: Date;
  number: number;
  name: string;
  entries: RaceEntry[]

}

//define race entry model
export interface RaceEntry {

  horseNumber: number;
  barrierNumber: number;
  horseName: string;
  jockeyName: string;
  weight: number;

}

@Injectable({
  providedIn: 'root'
})

export class FieldsService {

  private races: Race[];
  private racesSubject = new BehaviorSubject<Race[]>([]);

  constructor() { 

    //parse the json string of races from local storage and convert to actual races objects
    //and store them in the races holder variable

    try {
      this.races = JSON.parse(localStorage.getItem('races') || '') || [];
    } catch (error) {
      this.races = []
    }
      
      //call update after initing the service
      this.update();

   }

   subscribe(observer: Observer<Race[]>) {
     this.racesSubject.subscribe(observer)
   }

   //add race
   addRace(date: Date, raceName: string): Race {

    //create new race obj from parameters
     const race: Race = {date: date, number: this.races.length + 1, name: raceName, entries: []}
    
     //push the new race onto the races array
     this.races.push(race);

     this.update();

     return race;
   }

   getRace(raceNumber: number): Race {
     
    //index of the matching race number
    const index = this.races.findIndex( x => x.number === raceNumber);
    
    return this.races[index]
   }

   updateRace(date: Date, raceNumber: number, raceName: string) {

    //create new race obj from parameters
    const race: Race = {date: date, number: raceNumber, name: raceName, entries: []}

    //index of the matching race number
    const index = this.races.findIndex( x => x.number === raceNumber);

    this.races[index] = race;

    this.update();
   }

   //delete race
   deleteRace(raceNumber: number) {

    //index of the matching race number
    const index = this.races.findIndex( x => x.number === raceNumber);
    
    this.races.splice(index, 1);

    this.update();

   }

   addRaceEntry(raceNumber: number, horseNumber: number, barrierNumber: number, horseName: string, jockeyName: string, weight: number) {

    //create a new race entry
    const entry: RaceEntry = {horseNumber: horseNumber, barrierNumber: barrierNumber, horseName: horseName, jockeyName: jockeyName, weight: weight}

    //index of the matching race number
    const index = this.races.findIndex( x => x.number === raceNumber);

    this.races[index].entries.push(entry)

    this.update();

   }

   getRaceEntriesForRace(raceNumber: number, raceEntryNumber: number): RaceEntry {
     
    //index of the matching race number
    const index = this.races.findIndex( x => x.number === raceNumber);
    const race = this.races[index]

    const entryIndex = race.entries.findIndex( x => x.horseNumber === raceEntryNumber)
    
    return this.races[index].entries[entryIndex]
   }

   updateRaceEntry(raceNumber: number, horseNumber: number, barrierNumber: number, horseName: string, jockeyName: string, weight: number) {

    //create a new race entry
    const entry: RaceEntry = {horseNumber: horseNumber, barrierNumber: barrierNumber, horseName: horseName, jockeyName: jockeyName, weight: weight}

    //index of the matching race number
    const index = this.races.findIndex( x => x.number === raceNumber);

    const entryIndex = this.races[index].entries.findIndex( x => x.horseNumber === horseNumber);

    this.races[index].entries[entryIndex] = entry;

    this.update();

   }

   deleteRaceEntry( raceNumber: number, horseNumber: number) {

    //index of the matching race number
    const index = this.races.findIndex( x => x.number === raceNumber);

    const entryIndex = this.races[index].entries.findIndex( x => x.horseNumber === horseNumber);

    this.races[index].entries.splice(entryIndex, 1);

    this.update();
   }



   //stores the 
   private update() {
     localStorage.setItem('races', JSON.stringify(this.races))

     this.racesSubject.next(this.races.map(
       race => ({ date: race.date, number: race.number, name: race.name, entries: race.entries.map(
         raceEntry => ({ horseNumber: raceEntry.horseNumber, barrierNumber: raceEntry.barrierNumber, horseName: raceEntry.horseName, jockeyName: raceEntry.jockeyName, weight: raceEntry.weight })
       ) })
     ));
     
   }

  exportToFileFormat(): string {

    var holdString = ""

    for (let race of this.races) {

      //get date parts of the race date
      const year = new Date(race.date).getFullYear();
      const month = new Date(race.date).getMonth() + 1;
      const day = new Date(race.date).getDate();

      const raceNumber = race.number > 9 ? race.number : "0" + race.number
      const raceDay = day > 9 ? day : "0" + day
      const raceMonth = month > 9 ? month : "0" + month
      const raceName = race.name

      console.log(month)

      holdString += year + ", " + raceDay + "" + raceMonth + ", " + raceNumber + " " + raceName + "\n"

        for (let entry of race.entries) {

          holdString += " " + entry.horseNumber + "," + entry.barrierNumber + "," + "          " + entry.horseName + ",," + entry.horseName + " " + entry.weight + "kg" + "\n"

        }

        holdString += " " + ",,," + "          " + "LAST 600 METERS" + ",," + "\n"
        holdString += " " + ",,," + "          " + "LAST 400 METERS" + ",," + "\n"
        holdString += " " + ",,," + "          " + "LAST 200 METERS" + ",," + "\n"

    }

    return holdString

  }
}
