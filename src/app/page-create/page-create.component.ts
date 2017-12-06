import { Component, OnInit, Input, AfterViewInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { MatDatepicker, fadeInContent } from '@angular/material';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Moment } from 'moment';
import * as moment from 'moment';

import { CreatesService } from './../common/services/creates.service'
import { error } from 'selenium-webdriver';

import { ScheduleEvent } from './../common/models/service.model';
import { FormControl, Validators } from '@angular/forms';

import { FormDirective } from './../form.directive';
import { DynamicComponent } from "./../dynamic/dynamic.component";



@Component({
  selector: 'app-page-create',
  templateUrl: './page-create.component.html',
  styleUrls: ['./page-create.component.scss'],
  providers: [CreatesService]
})
export class PageCreateComponent implements OnInit, OnDestroy {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  //Here is where it starts for the time
  private _createService;
  services: any = [];
  songLeaders: any = [];

  serviceEvents: any = []
  songs: any = [];
  eventTypes: any = []
  persons: any = [];


  activated = true;
  errorMsg: any;

  serviceValue: string;
  songLeaderValue: string;


  //Here is for component
  @Input() ads: any[];
  currentAddIndex: number = -1;
  @ViewChild(FormDirective) adHost: FormDirective;
  subscription: any;
  interval: any;



  constructor(createService: CreatesService,
    private componentFactoryResolver: ComponentFactoryResolver) {
    this._createService = createService;
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent(value: any) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicComponent);

    let viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<DynamicComponent>componentRef.instance).someProp = value;
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
    this.serviceValue = newService.value;
    console.log(newService.value)

    this._createService.getServiceEvents(this.serviceValue)
      .subscribe(serviceEvent => this.serviceEvents = serviceEvent,
      error => this.errorMsg = <any>error,
      () => this.formatServiceEvents(this.serviceEvents))
  }

  getPerson(id: number) {
    console.log('getPerson  ' + id)
    if (id !== null) {
      console.log("cpai")
      for (var i = 0; i < this.persons.length; i++) {
        if (this.persons[i].personId === id) {
          return this.persons[i].firstName + " " + this.persons[i].lastName;
        }
      }
    }

    return null;
  }

  getSong(id: number): string {
    if (id !== null) {
      for (var i = 0; i < this.songs.length; i++) {
        if (this.songs[i].songId === id) {
          return this.songs[i].title;
        }
      }
    }

    return null;
  }

  getEventType(id: number): string {
    if (id !== null) {
      for (var i = 0; i < this.eventTypes.length; i++) {
        if (this.eventTypes[i].eventTypeId === id) {
          return this.eventTypes[i].description;
        }
      }
    }

    return null;
  }

  formatServiceEvents(serEvents: any) {

    var events = []

    for(var i = 0; i < serEvents.length; i++) {
      events.push({
        "eventID": "",
        "eventName": this.getEventType(serEvents[i].eventTypeId),
        "songName": this.getSong(serEvents[i].songId),
        "personName": this.getPerson(serEvents[i].personId)
      })
      //console.log(serEvents[i].eventTypeId + " " + serEvents[i].songId + " " + serEvents[i].personId)
    }


    console.log('aqiiii')
    console.log(events);
    console.log('aqiiii')

    this.loadComponent(events)

  }

  selectedSongLeader(newSongLeader: any) {
    this.songLeaderValue = newSongLeader.value;
  }


  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {

    if (event.value) {
      console.log(moment(event.value).format('YYYY MM DD'))
      this.activated = false;
    } else {
      this.activated = true;
      console.log('There was an error.');
    }
  }

  postSvc() {
    console.log("Service should be created")
  }
}
