import { Component } from '@angular/core';
import { MatDatepicker, fadeInContent } from '@angular/material';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { Moment } from 'moment';
import * as moment from 'moment';


@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent {

  constructor() { }
  activated = true;
  
    addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
  
      if(event.value) {
        console.log(moment(event.value).format('YYYY MM DD'))
        this.activated = false;
      } else {
        this.activated = true;
        console.log('There was an error.');
      }
    }

}
