import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreditCardComponent } from './components/credit-card/credit-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CreditCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FECreditCard';
}
