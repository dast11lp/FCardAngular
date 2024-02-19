import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';
import { BankAccounttComponent } from './components/bank-accountt/bank-accountt.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'addcard', component: CreditCardComponent},
    {path: 'backaccount/:id', component: BankAccounttComponent},
];
