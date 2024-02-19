import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BankAccount } from '../../components/bank-accountt/bank-account';

@Injectable({
  providedIn: 'root'
})
export class BankAccounttService {

  constructor(private http: HttpClient) { }

  private myAppUrl = 'https://localhost:7277/';
  private myApiUrl = 'api/bankAccount/';

  getBankAccount(id: string | null): Observable<BankAccount> {
    return this.http.get<BankAccount>(this.myAppUrl + this.myApiUrl + id)
  }
}
