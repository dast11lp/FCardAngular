import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditCardServeService {
  private myAppUrl = 'https://localhost:7277/';
  private myApiUrl = 'api/card/';
  constructor(private http: HttpClient) {}

  getListCards(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  deleteCard(id: number): Observable<any> {
    return this.http.delete(this.myAppUrl + this.myApiUrl + id)
  }

  saveCard (card: any): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, card);
  }

  updateCard (id: number, card: any):Observable<any> {
    return this.http.put(this.myAppUrl + this.myApiUrl + id, card)
  }
}