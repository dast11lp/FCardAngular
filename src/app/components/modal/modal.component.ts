import { Component, Input, OnChanges, OnInit, SimpleChanges, input } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {
  @Input() isOpen = false;
  private subscription!: Subscription;


  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    this.subscription = new Subscription();
    this.subscription.add(
      this.modalService.show$.subscribe((value) => {this.isOpen = true; console.log(value);
       })
    );
    this.subscription.add(
      this.modalService.hide$.subscribe(() => this.isOpen = false)
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  onCloseClick() {
    this.modalService.hide()
  }
}
