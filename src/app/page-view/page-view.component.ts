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

    services.forEach(element => {
      console.log(element.svcDateTime)
      if ((element.svcDateTime).includes(routeId)) {
        this.serviceID = element.serviceId
      }
    });

    console.log(this.serviceID)
    console.log("I am here")

    if (this.serviceID != "") {

      this._createService.getServiceEvents(this.serviceID)
      .subscribe(serviceEvent => this.serviceEvents = serviceEvent,
      error => this.errorMsg = <any>error,
      () => this.loadComponent(this.serviceEvents))
    }
  }

}
