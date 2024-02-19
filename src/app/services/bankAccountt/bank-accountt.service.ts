import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankAccounttService {

  constructor(private http: HttpClient) { }

  private myAppUrl = 'https://localhost:7277/';
  private myApiUrl = 'api/bankAccount/';

  getBankAccount(id: string | null): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl + id)
  }
}
