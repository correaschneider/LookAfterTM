import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Data, Diaper } from '../interfaces/diapers';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class DiaperService {

  constructor(private httpClient: HttpClient) { }

  getDiapers () {
    return this.httpClient.get<Data>('http://localhost:3000');
  }
  
  postOrder(order) {
    return this.httpClient.post('http://localhost:3000/orders', order, httpOptions);
  }
  
  getDiaper(diaper_id) {
    return this.httpClient.get<Diaper>(`http://localhost:3000/diaper/${diaper_id}`);
  }
}
