import { Injectable } from '@angular/core';
//import { Response, Headers, RequestOptions } from '@angular/http';
import { Subject, Observable } from 'rxjs/RX';
import { IService, IPeople } from './../models/service.model';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import 'rxjs/Rx';

//import { HttpErrorResponse } from '@angular/common/http/src/response';

@Injectable()
export class CreatesService {

  private _backEndUrl = environment.API_HOST + ":" + environment.API_PORT + "/api";

  constructor(public _http: HttpClient) { };

  private get xsrfToken() {
    // todo: some logic to retrieve the cookie here. we're in a service, so you can inject anything you'd like for this
    return '';
  }

  private handleError(error: HttpErrorResponse) {
    console.log("I ma here !!!!")
    return Observable.throw(error.message || 'Server error');
  }

  getServices(): Observable<IService[]> {

    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');


    console.log('getServices   ---> is being called')
    return this._http.get(this._backEndUrl + "/Services", { headers: headers })
      //.map((response: HttpResponse) => <IService[]>response)
      .do(data => console.log("All " + JSON.stringify(data)))//console.log("All: " + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getService() {

  }

  getSongLeaders(): Observable<IPeople[]> {

    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');


    console.log('getSongLeaders   ---> is being called')
    return this._http.get(this._backEndUrl + "/People/songLeaders", { headers: headers })    ///WOWRING IN HERE
      //.map((response: HttpResponse) => <IService[]>response)
      .do(data => console.log("All " + JSON.stringify(data)))
      .catch(this.handleError);
  }


  getPeople(): Observable<IPeople[]> {

    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    

    console.log('getPeople   ---> is being called')
    return this._http.get(this._backEndUrl + "/People", { headers: headers })    ///WOWRING IN HERE
      //.map((response: HttpResponse) => <IService[]>response)
      .do(data => console.log("All " + JSON.stringify(data)))
      .catch(this.handleError);
  }
}
