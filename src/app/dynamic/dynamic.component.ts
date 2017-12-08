import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IServiceEvent } from './../common/models/service.model'
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { CreatesService } from './../common/services/creates.service';


@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss']
})
export class DynamicComponent implements OnInit {

  subscription: Subscription;
  //@Input() hello: string;
  @Input() serviceEvent: any[];
  @Output() onSomething = new EventEmitter<any[]>();

  constructor(private createsService: CreatesService) {
    this.subscription = this.createsService
      .getMessageFromDynamic()
      .subscribe(message => { this.onSomething.emit(this.serviceEvent) });
      //.subscribe(message => { this.printValues() });
  }

  ngOnInit() {
    //console.log(this.serviceEvent)
  }

  printValues() {
    console.log("I should be printed")
    console.log( (this.serviceEvent))
  }

}