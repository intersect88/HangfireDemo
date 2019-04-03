import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Counter } from './counter';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class HomeService {
  constructor(
    private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  /** GET incremented counter from the server */
  getIncrementedCounter() {
    return this.http.get<number>(this.baseUrl + 'api/SampleData/GetIncrementedCounter');
  }
  //////// Save methods //////////

  /** PUT: Send currentCounter to the server */
  sendCurrentCounter(currentCounter: Counter) {
    return this.http.put(this.baseUrl + '/api/SampleData/SendCurrentCounter', currentCounter, httpOptions);
  }
}
