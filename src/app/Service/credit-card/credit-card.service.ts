import { Injectable } from '@angular/core';
import { CreditCardServeService } from '../credit-card-http.service';

@Injectable({
  providedIn: 'root'
})
export class CreditCardServiceTsService {
 
  constructor(private _creditCardService: CreditCardServeService) { 
    
  }




}
