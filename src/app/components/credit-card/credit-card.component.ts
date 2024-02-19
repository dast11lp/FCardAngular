import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UpperCasePipe } from '@angular/common';
import { CreditCardFormComponent } from '../credit-card-form/credit-card-form.component';
import { CreditCardListComponent } from '../credit-card-list/credit-card-list.component';
import { CreditCardServeService } from '../../services/credit-card-http.service';

@Component({
  selector: 'app-credit-card',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    UpperCasePipe,
    CreditCardFormComponent,
    CreditCardListComponent,
  ],
  templateUrl: './credit-card.component.html',
  styleUrl: './credit-card.component.css'
})
export class CreditCardComponent {
  listCards: any[] = [];
  title = "Agregar";
  id: number | undefined;
  info: any;
  inputEvent: any;

  constructor(
    // private fb: FormBuilder,
    private toastr: ToastrService,
    private _creditCardService: CreditCardServeService
  ) { }

  ngOnInit(): void {
    this.getCreditCards();
  }
  
  getCreditCards() {
    this._creditCardService.getListCards().subscribe({
      next: data => this.listCards = data,
      error: err => console.error(err),
    })
  }

  getEditInfo(info: any) {
    this.info = info;
  }

  changeTitle(title: string):void {
    this.title = title
  }
}
