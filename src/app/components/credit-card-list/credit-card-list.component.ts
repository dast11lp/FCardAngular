import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CreditCardServeService } from '../../services/credit-card-http.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-credit-card-list',
  standalone: true,
  imports: [RouterLink],
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

  @Output()
  titleToChange: EventEmitter<string> = new EventEmitter();


  constructor(
    private _creditCardService: CreditCardServeService,
    private toastr: ToastrService,
  ) {

  }

  deleteCard(id: number): void {
    this._creditCardService.deleteCard(id).subscribe({
      next: () => {
        this.toastr.error("La tarjeta fue eliminada con exito", "Tarjeta eliminada",)
        this.updateList.emit();
      },
      error: err => console.error(err),
    });
  }

  editCard(card: any): void {
    // this.action = "Editar";
    this.titleToChange.emit('Editar')
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
  }
}
