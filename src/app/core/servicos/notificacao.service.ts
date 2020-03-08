import { Injectable, NgZone } from '@angular/core';

import { ToastrService, ActiveToast } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorGroup, ErrorItem } from '../helpers/error.handler';

@Injectable({
    providedIn: 'root'
})
export class NotificacaoService {

    constructor(private toastr: ToastrService,
               private zone: NgZone) { }

    show(message?: string, title?: string): ActiveToast<any> {
        let result: ActiveToast<any> = null;
        this.zone.run(() => result = this.toastr.show(message, title));
        return result;
    }
    
    success(message?: string, title?: string): ActiveToast<any> {
        let result: ActiveToast<any> = null;
        this.zone.run(() => result = this.toastr.success(message, title));
        return result;
    }

    error(message?: string, title?: string): ActiveToast<any> {
        let result: ActiveToast<any> = null;
        this.zone.run(() => result = this.toastr.error(message, title));
        return result;
    }

    info(message?: string, title?: string): ActiveToast<any> {
        let result: ActiveToast<any>  = null;
        this.zone.run(() => result = this.toastr.info(message, title));
        return result;
    }

    warning(message?: string, title?: string): ActiveToast<any> {
        let result: ActiveToast<any>  = null;
        this.zone.run(() => result = this.toastr.warning(message, title));
        return result;
    }

    clear(toastId?: number): void {
        this.zone.run(() => this.toastr.clear(toastId));
    }

    remove(toastId: number): void {
        this.zone.run(() => this.toastr.remove(toastId));
    }

    errorResponse(error: HttpErrorResponse): void {
        if (error.status === 400) {
          const result: ErrorGroup = <ErrorGroup>error.error;
          result.data.forEach((valor: ErrorItem, indice: number) => {
            this.error(valor.mensagem);
          });
        } else {
          this.error(error.message, error.statusText);
        }
      }
}