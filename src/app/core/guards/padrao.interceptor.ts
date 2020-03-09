import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

import { Observable, throwError, EMPTY } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { AppConfig } from '@app/app.config';
import { NotificacaoService } from '../servicos/notificacao.service';
import { AutenticacaoService } from '../servicos/autenticacao.service';

@Injectable()
export class PadraoInterceptor implements HttpInterceptor {

  constructor(
    private injector: Injector,
    private notificacao: NotificacaoService) {
        this.autenticacao = this.injector.get(AutenticacaoService);
  }

  private autenticacao: AutenticacaoService;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.autenticacao) {
      this.notificacao.clear();
      this.notificacao.warning('Os recursos não estão disponíveis no momento');
      return throwError({
        status: 0,
        message: 'Os recursos não estão disponíveis no momento',
        statusText: 'Restrição interna',
      });
    }

    let request: HttpRequest<any> = req.clone({
      setHeaders: {}
    });

    if (this.autenticacao.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.autenticacao.token}`
        }
      });
    }

    return next.handle(request).pipe(
      finalize(() => {  }),
      catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 0) {
            this.notificacao.error('Não foi possível acessar sua rede de internet');
          } else if (error.status === 401 || error.status === 203) {
            this.notificacao.clear();
            this.notificacao.error('Acesso não autorizado');
            this.autenticacao.sair();
            return EMPTY;
          } else if (error.status === 0) {
            return throwError({
              status: error.status,
              message: 'Não foi possível executar a ação solicitada',
              statusText: 'Acesso a rede',
            });
          } else if (error.status === 500) {
            return throwError({
              status: error.status,
              message: 'Ocorreu um erro interno ao executar a solicitação',
              statusText: 'Erro interno',
            });
          }
        }
        return throwError(error);
      })
    );
  }
}
