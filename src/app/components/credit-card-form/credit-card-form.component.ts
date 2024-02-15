import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreditCardServeService } from '../../Service/credit-card-http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-credit-card-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './credit-card-form.component.html',
  styleUrl: './credit-card-form.component.css'
})
export class CreditCardFormComponent {
  form: FormGroup; 

  @Input()
  info: any;

  // action = "Agregar";
  // id: number | undefined;

  @Output()
  updateList: EventEmitter<boolean> = new EventEmitter();

  constructor (
    private toastr: ToastrService,
    private _creditCardService: CreditCardServeService,
    private fb: FormBuilder,
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

  saveCard(): void {
    const card: any = {
      holder: this.form.get('holder')?.value,
      cardNumber: this.form.get('cardNumber')?.value,
      dueDate: this.form.get('dueDate')?.value,
      cvv: this.form.get('cvv')?.value,
  }

    // if (this.id === undefined) {
      this._creditCardService.saveCard(card).subscribe({
        next: data => {
          // this.listCards.push(data)
          this.updateList.emit();
          this.toastr.success('Targeta Registrada', 'la tarjeta fue registrada con exito');
          this.form.reset();
        },
        error: err => {
          this.toastr.error('Upss... Ocurrió un error', 'Error')
          console.log(err)
        }
      })
      // this.listCards.push(card);
    // } else {
    //   card.id = this.id
    //   // editar tarjeta
    //   this._creditCardService.updateCard(this.id, card).subscribe({
    //     next: data => {
    //       this.form.reset();
    //       this.action =  "Agregar";
    //       this.id = undefined;
    //       this.toastr.info('La tarjeta fue actualizada con exito', 'Tarjeta actualizada')
    //       //this.getCreditCards();
    //     },
    //     error: error => {
    //       console.log(error);
          
    //     }
    //   })
    // }
  };
}
