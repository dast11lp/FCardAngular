import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreditCardComponent } from './components/credit-card/credit-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ModalComponent } from './components/modal/modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CreditCardComponent, NavbarComponent, ModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FECreditCard';
}
