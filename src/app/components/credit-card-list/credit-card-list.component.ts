import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { CreditCardServeService } from '../../Service/credit-card-http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-credit-card-list',
  standalone: true,
  imports: [],
  templateUrl: './credit-card-list.component.html',
  styleUrl: './credit-card-list.component.css'
})
export class CreditCardListComponent { 

  @Input()
  listCards: any[] = [];

  @Output()
  editInfo: EventEmitter<any> = new EventEmitter();
  
  // action = "Agregar";
  // id: number | undefined;

  @Output()
  updateList: EventEmitter<boolean>  = new EventEmitter();


  constructor (
    private _creditCardService: CreditCardServeService,
    private toastr: ToastrService,
    ) {
     
  }

  deleteCard(id: number): void {
    // this.listCards.splice(index, 1);
    this._creditCardService.deleteCard(id).subscribe({
      next: data => {
        this.toastr.error("La tarjeta fue eliminada con exito", "Tarjeta eliminada",)
        this.updateList.emit();
      },
      error: err => console.error(err),
    });
  }

  editCard(card: any): void {
    // this.action = "Editar";
    // this.id = card.id;
    //this.form.setValue
    this.editInfo.emit({
      form: {
      holder: card.holder,
      cardNumber: card.cardNumber,
      dueDate: card.dueDate,
      cvv: card.cvv,
      },
    });
    // this.form.patchValue()
  }
}
