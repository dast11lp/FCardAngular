import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private _show$ = new Subject<void>();
  private _hide$ = new Subject<void>();

  show$ = this._show$.asObservable();
  hide$ = this._hide$.asObservable();

  constructor() { }

  show() {
    this._show$.next();
  }

  hide() {
    this._hide$.next();
  }
}
