import { Component, OnInit, Input, AfterViewInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { MatDatepicker, fadeInContent } from '@angular/material';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Moment } from 'moment';
import * as moment from 'moment';

import { CreatesService } from './../common/services/creates.service'
import { error } from 'selenium-webdriver';

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
  peoples: any = [];
  songLeaders: any = [];
  serviceEvents: any = []
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
    console.log("this is Cesar Whatley")
    this._createService.getServices()
      .subscribe(service => this.services = service,
      error => this.errorMsg = <any>error);


    this._createService.getSongLeaders()
      .subscribe(songLeader => this.songLeaders = songLeader,
      error => this.errorMsg = <any>error)
  }

  selectedService(newService: any) {
    this.serviceValue = newService.value;
    console.log(newService.value)

    this._createService.getServiceEvents(this.serviceValue)
      .subscribe(serviceEvent => this.serviceEvents = serviceEvent,
      error => this.errorMsg = <any>error,
      () => this.loadComponent(this.serviceEvents))
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

  createService() {
    console.log("Service should be created")
  }
}
