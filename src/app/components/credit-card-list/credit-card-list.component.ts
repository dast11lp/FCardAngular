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

  @Output()
  updateList: EventEmitter<boolean> = new EventEmitter();


  constructor(
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
    this.editInfo.emit(
      {
        card:{
          holder: card.holder,
          cardNumber: card.cardNumber,
          dueDate: card.dueDate,
          cvv: card.cvv,
        },
        id: card.id
      }
    );
    // this.form.patchValue()
  }
}
