import { Component, OnInit, Input } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { MatDatepicker, fadeInContent } from '@angular/material';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Moment } from 'moment';
import * as moment from 'moment';

import { error } from 'selenium-webdriver';

import { ScheduleEvent } from './../common/models/service.model';
import { FormControl, Validators } from '@angular/forms';
import { CreatesService } from './../common/services/creates.service'

import { DynamicComponent } from "./../dynamic/dynamic.component";
import { Server } from 'selenium-webdriver/safari';
import { print } from 'util';

//https://github.com/gund/ng-dynamic-component  ==  Information for 
//dynamic components

@Component({
  selector: 'app-page-create',
  templateUrl: './page-create.component.html',
  styleUrls: ['./page-create.component.scss'],
  providers: [CreatesService]
})
export class PageCreateComponent implements OnInit {

  timeFormControl = new FormControl(this.parseDate(new Date().toISOString(), false), [
    Validators.required,
    Validators.pattern('[0-2][0-9]:[0-5][0-9]:[0-5][0-9]')
  ]);
  serializedDate = new FormControl(new Date());


  //Here is where it starts for the time
  private _createService;
  services: any = [];
  songLeaders: any = [];


  serviceEvents: any = []
  newServicEvents: any = [];
  songs: any = [];
  eventTypes: any = []
  persons: any = [];


  errorMsg: any;

  serviceDate: string;
  serviceId: string;
  songLeaderValue: string;
  newTitle: string;
  newSongName: string;
  newServiceTime: string;


  // New way of doing components
  formComponent: any;
  formInput: any;
  formOutput: any;



  constructor(createService: CreatesService) {
    this._createService = createService;
  }

  ngOnInit() {
    

    this._createService.getServices()
      .subscribe(service => this.services = service,
      error => this.errorMsg = <any>error);


    this._createService.getSongLeaders()
      .subscribe(songLeader => this.songLeaders = songLeader,
      error => this.errorMsg = <any>error)

    //Getting people
    this._createService.getPeople()
      .subscribe(person => this.persons = person,
      error => this.errorMsg = <any>error)

    //Getting eventTypes
    this._createService.getEventTypes()
      .subscribe(eventType => this.eventTypes = eventType,
      error => this.errorMsg = <any>error)

    //Getting Songs
    this._createService.getSongs()
      .subscribe(song => this.songs = song,
      error => this.errorMsg = <any>error)

  }

  selectedService(newService: any) {
    let dateSelect = newService.value.split("=");
    this.serviceDate = dateSelect[0];
    this.serviceId = dateSelect[1];

    this._createService.getServiceEvents(this.serviceId)
      .subscribe(serviceEvent => this.serviceEvents = serviceEvent,
      error => this.errorMsg = <any>error,
      () => this.formatServiceEvents(this.serviceEvents, this.serviceId))
  }

  findPerson(id: number) {
    if (id !== null) {
      for (var i = 0; i < this.persons.length; i++) {
        if (this.persons[i].personId === id) {
          return this.persons[i].firstName + " " + this.persons[i].lastName;
        }
      }
    }

    return null;
  }

  findSong(id: number): string {
    if (id !== null) {
      for (var i = 0; i < this.songs.length; i++) {
        if (this.songs[i].songId === id) {
          return this.songs[i].title;
        }
      }
    }

    return null;
  }

  findEventType(id: number): string {
    if (id !== null) {
      for (var i = 0; i < this.eventTypes.length; i++) {
        if (this.eventTypes[i].eventTypeId === id) {
          return this.eventTypes[i].description;
        }
      }
    }

    return null;
  }

  formatServiceEvents(serEvents: any, serviceID: string) {

    var events = []

    for (var i = 0; i < serEvents.length; i++) {
      events.push({
        "serviceId": serviceID,
        "eventId": serEvents[i].eventId,
        "eventName": this.findEventType(serEvents[i].eventTypeId),
        "songName": this.findSong(serEvents[i].songId),
        "personName": this.findPerson(serEvents[i].personId),
        "eventNotes": serEvents[i].notes
      });
    }

    this.formComponent = DynamicComponent;

    this.formInput = {
      serviceEvent: events
    };
    this.formOutput = {
      onSomething: (type) => this.newServicEvents = type
    }
  }

  selectedSongLeader(newSongLeader: any) {
    this.songLeaderValue = newSongLeader.value;
  }

  parseDate(date: string, month: boolean): string {
    let dateParts = date.split('T');
    let timeParts = dateParts[1].split('.');

    if(month) {
      return dateParts[0];
    } else {
      return timeParts[0];
    }
  }
  

  postSvc() {
    //this._createService.sendMessageToDynamic();
    console.log("postSvc()")

    let newService = {
      "svcDateTime": this.serviceDate,
      "theme": "Peace of Christ Rule in Your Hearts",
      "title": "A.M Worship Service",
      "notes": null,
      "organistConf": "Y",
      "songleaderConf": "N",
      "pianistConf": "Y",
      "organistId": 6,
      "songleaderId": 16,
      "pianistId": 10,
      "organist": null,
      "pianist": null,
      "songleader": null,
      "personunavailable": [],
      "serviceevent": []
    }

    console.log(this.timeFormControl.value)
    console.log(this.serializedDate.valid)
    console.log(this.parseDate(this.serializedDate.value.toISOString(), true))

    // this._createService.postService(newService)
    // .subscribe(
    //   (val) => {
    //         console.log("POST call successful value returned in body", val);
    //         this.services.push(val)
    //     },
    //     response => {
    //         console.log("POST call in error", response);
    //     });
  }
}
