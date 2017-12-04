import { Component, OnInit, Input, AfterViewInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Observable } from "rxjs/Observable";
import { CreatesService } from './../common/services/creates.service'
import { IService } from './../common/models/service.model';

import { FormDirective } from './../form.directive';
import { DynamicComponent } from "./../dynamic/dynamic.component";


@Component({
  selector: 'app-page-view',
  templateUrl: './page-view.component.html',
  styleUrls: ['./page-view.component.scss'],
  providers: [CreatesService]
})
export class PageViewComponent implements OnInit {

  private _createService;
  services: any = [];
  errorMsg: any;
  serviceEvents: any = []
  serviceID: string;

  songs: any = [];
  eventTypes: any = []
  persons: any = [];


  //Here is for component
  @Input() ads: any[];
  currentAddIndex: number = -1;
  @ViewChild(FormDirective) adHost: FormDirective;
  subscription: any;
  interval: any;


  constructor(private route: ActivatedRoute,
    createService: CreatesService,
    private componentFactoryResolver: ComponentFactoryResolver) {
    this._createService = createService;
    this.route.params.subscribe(params => this.getServices(params['serviceID']));
    console.log("This is running.")
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

  getServices(routeId: string) {
    console.log(routeId)
    this._createService.getServices()
      .subscribe(service => this.services = service,
      error => this.errorMsg = <any>error,
      () => this.checkService(this.services, routeId));
  }

  checkService(services: any[], routeId: string) {

    this.serviceID = "";
    console.log("I am running" + routeId)

    for(var i = 0; i < services.length; i++) {
      if ((services[0].svcDateTime).includes(routeId)) {
        this.serviceID = services[0].serviceId;
        break;
      }
    }

    console.log(this.serviceID)
    console.log("I am here")

    if (this.serviceID != "") {

      this._createService.getServiceEvents(this.serviceID)
        .subscribe(serviceEvent => this.serviceEvents = serviceEvent,
        error => this.errorMsg = <any>error,
        () => this.formatServiceEvents(this.serviceEvents))
    }
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

    for (var i = 0; i < serEvents.length; i++) {
      events.push({
        "eventID": "",
        "eventName": this.getEventType(serEvents[i].eventTypeId),
        "songName": this.getSong(serEvents[i].songId),
        "personName": this.getPerson(serEvents[i].personId)
      })
      //console.log(serEvents[i].eventTypeId + " " + serEvents[i].songId + " " + serEvents[i].personId)
    }

    this.loadComponent(events)
  }

}
