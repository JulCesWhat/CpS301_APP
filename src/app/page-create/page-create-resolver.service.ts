import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { CreatesService } from './../common/services/creates.service'
import { Subject, Observable } from 'rxjs/RX';

@Injectable()
export class PageCreateResolverService implements Resolve<any> {

  private errorMessage: string;
  
    constructor(private createsService: CreatesService) { }
  
    resolve() {
      console.log('PageCreateResolverService  --> is being called')
      return this.createsService.getServices()
        .map(service => service,
        error => {
          console.log('Error in the resolver. :)')
          this.errorMessage = <any>error;
        })
        .catch(e => Observable.of({ error: e }));
    }

}
