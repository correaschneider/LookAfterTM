import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Data, Diaper, Message } from '../interfaces/diapers';
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
    return this.httpClient.get<Data>('http://localhost:3000/diaper');
  }
  
  postOrder(order) {
    return this.httpClient.post<Message>('http://localhost:3000/order', order, httpOptions);
  }
  
  getDiaper(diaper_id) {
    return this.httpClient.get<Diaper>(`http://localhost:3000/diaper/${diaper_id}`);
  }
  
  setDiaper(diaper) {
    return this.httpClient.post<Message>(`http://localhost:3000/diaper`, diaper, httpOptions);
  }
}
