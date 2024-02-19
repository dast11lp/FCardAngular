import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../components/credit-card/credit-card';

@Injectable({
  providedIn: 'root'
})
export class CreditCardServeService {
  private myAppUrl = 'https://localhost:7277/';
  private myApiUrl = 'api/card/';
  constructor(private http: HttpClient) {}

  getListCards(): Observable<CreditCard[]> {
    return this.http.get<CreditCard[]>(this.myAppUrl + this.myApiUrl);
  }

  deleteCard(id: number): Observable<CreditCard> {
    return this.http.delete<CreditCard>(this.myAppUrl + this.myApiUrl + id)
  }

  saveCard (card: any): Observable<CreditCard> {
    return this.http.post<CreditCard>(this.myAppUrl + this.myApiUrl, card);
  }

  updateCard (id: number, card: CreditCard):Observable<CreditCard> {
    return this.http.put<CreditCard>(this.myAppUrl + this.myApiUrl + id, card)
  }
}