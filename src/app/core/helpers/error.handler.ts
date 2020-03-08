import { HttpErrorResponse } from '@angular/common/http';

import { throwError } from 'rxjs';

export class ErrorHandler {
    static handleError(error: HttpErrorResponse | any) {
        let errorMessage: string;
        if (error instanceof HttpErrorResponse) {
            const body = error.error;
            errorMessage = `${error.url}: ${error.status} - ${error.statusText || ''} ${body}`;
        } else {
            errorMessage = error.message ? error.message : error.toString();
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }
}

export interface ErrorGroup {
    success: boolean,
    data : ErrorItem[]
}

export interface ErrorItem {
    mensagem: string;
}