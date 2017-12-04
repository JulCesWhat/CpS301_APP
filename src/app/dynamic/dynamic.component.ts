import { Component, Input, OnInit } from '@angular/core';
import { IServiceEvent } from './../common/models/service.model'

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss']
})
export class DynamicComponent implements OnInit {

  @Input('someProp') someProp
  constructor() {
   }

  ngOnInit() {
    console.log("Estamoes en el dynimic....")
    console.log(this.someProp)
  }

}
