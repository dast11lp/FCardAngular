import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CreditCardServeService } from '../../services/credit-card-http.service';

@Component({
  selector: 'app-credit-card-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './credit-card-form.component.html',
  styleUrl: './credit-card-form.component.css'
})
export class CreditCardFormComponent implements OnChanges{
  form: FormGroup;
  @Input() info: any;

  @Input() inputEvent: any;


  cvv: number | undefined;

  id: number | undefined;

  event: any;

  @Output()
  updateList: EventEmitter<void> = new EventEmitter();

  @Output()
  titleToChange: EventEmitter<string> = new EventEmitter();

  constructor(
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
        Validators.pattern(/\d{2}\/\d{2}/)
      ]],
      cvv: ['', [
        Validators.required,
        Validators.pattern(/[0-9]{3}/)
      ]],
    });

    this.form.get('cvv')?.valueChanges.subscribe({
      next: newValue => this.validEntryNumber(newValue, 'cvv')
    })

    this.form.get('cardNumber')?.valueChanges.subscribe({
      next: newValue => this.validEntryNumber(newValue, 'cardNumber')
    })
  }


  ngOnChanges(changes: SimpleChanges): void {
    
    if (changes['info']) {
      this.form.patchValue(this.info?.card);
      this.id = this.info?.id
    }
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
        next: () => {
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
    } else {
      card.id = this.id
      // editar tarjeta
      this._creditCardService.updateCard(this.id, card).subscribe({
        next: () => {
          this.form.reset();
          this.changeTitle("Agregar")
          this.id = undefined;
          this.toastr.info('La tarjeta fue actualizada con exito', 'Tarjeta actualizada')
          //this.getCreditCards();
          this.updateList.emit();
        },
        error: error => {
          console.log(error);

        }
      })
    }
  };

  validEntryNumber(entry: string, formControlName: string) {
    if(entry) {
      entry = entry.replace(/[^0-9]/, '')
      this.form.patchValue({ [formControlName]: entry }, { emitEvent: false })
    }
  }

  changeTitle(title: string) {
    this.titleToChange.emit(title);
  }
}
