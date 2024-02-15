import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CreditCardServeService } from '../../Service/credit-card-serve.service';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-credit-card',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    UpperCasePipe
  ],
  templateUrl: './credit-card.component.html',
  styleUrl: './credit-card.component.css'
})
export class CreditCardComponent implements OnInit {
  listCards: any[] = [];
  action = "Agregar";
  form: FormGroup;
  id: number | undefined;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _creditCardService: CreditCardServeService
  ) {
    this.form = this.fb.group({
      holder: ['', Validators.required],
      cardNumber: ['', [
        Validators.required,
        Validators.maxLength(16),
        Validators.minLength(16),
      ]],
      dueDate: ['', [
        Validators.required,
        Validators.maxLength(5),
        Validators.minLength(5),
      ]],
      cvv: ['', [
        Validators.required,
        Validators.maxLength(3),
        Validators.minLength(3),
      ]],
    });
  }

  ngOnInit(): void {
    this.getCreditCards();

  }

  getCreditCards() {
    this._creditCardService.getListCards().subscribe({
      next: data => this.listCards = data,
      error: err => console.error(err),
      // complete: () =>
    })
  }

  saveCard(): void {
    const card: any = {
      holder: this.form.get('holder')?.value,
      cardNumber: this.form.get('cardNumber')?.value,
      dueDate: this.form.get('dueDate')?.value,
      cvv: this.form.get('cvv')?.value,
    }

    if (this.id === undefined) {
      this._creditCardService.saveCard(card).subscribe({
        next: data => {
          // this.listCards.push(data)
          this.getCreditCards();
          this.toastr.success('Targeta Registrada', 'la tarjeta fue registrada con exito');
          this.form.reset();
        },
        error: err => {
          this.toastr.error('Upss... Ocurrió un error', 'Error')
          console.log(err)
        }
      })
      // this.listCards.push(card);
    } else {
      card.id = this.id
      // editar tarjeta
      this._creditCardService.updateCard(this.id, card).subscribe({
        next: data => {
          this.form.reset();
          this.action =  "Agregar";
          this.id = undefined;
          this.toastr.info('La tarjeta fue actualizada con exito', 'Tarjeta actualizada')
          this.getCreditCards();
        },
        error: error => {
          console.log(error);
          
        }
      })
    }
  };

  deleteCard(id: number): void {
    // this.listCards.splice(index, 1);
    this._creditCardService.deleteCard(id).subscribe({
      next: data => {
        this.toastr.error("La tarjeta fue eliminada con exito", "Tarjeta eliminada",)
        this.getCreditCards();
      },
      error: err => console.error(err),
    });
  }

  editCard(card: any): void {
    this.action = "Editar";
    this.id = card.id;
    //this.form.setValue
    this.form.patchValue({
      holder: card.holder,
      cardNumber: card.cardNumber,
      dueDate: card.dueDate,
      cvv: card.cvv,
    })
  }
}
