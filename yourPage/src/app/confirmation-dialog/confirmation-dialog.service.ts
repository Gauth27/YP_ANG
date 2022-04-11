import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {

  constructor(private modalService: NgbModal) { }

  public confirm(
    message: string,
    dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, { size: dialogSize });
    modalRef.componentInstance.message = message;
    return modalRef.result;
  }

}
