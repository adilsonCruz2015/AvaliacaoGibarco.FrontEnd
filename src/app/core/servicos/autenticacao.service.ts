import { Injectable, EventEmitter } from '@angular/core';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Autenticacao } from '../modelos/autenticacao.model';
import { Usuario } from '../modelos/usuario.model';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/app.config';
import { HttpParamsHelper } from '../helpers/http-params-helper';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AutenticacaoService {
    constructor(private storage: StorageService,
                private router: Router,
                private http: HttpClient) { }

    private autenticacao: Autenticacao = null;

    /** É disparado quando os dados do serviços são zerados */
  readonly eventSaida: EventEmitter<boolean> = new EventEmitter();

    get autenticado(): boolean {
        return !!this.autenticacao;
    }

    get token() {
        return this.storage.getCookie('token');
    }

    navegarHome(): void {
        this.router.navigate(['/']);
    }

    obter(): Autenticacao {
        return this.autenticacao;
    }

    obterUsuario(): Usuario {
        return this.autenticacao ? this.autenticacao.usuario : null;
    }

    sair(emit = true) {
        this.autenticacao = null;
        this.storage.removeCookie('token');

        if(emit) {
            this.eventSaida.emit(true);
        }
    }

    private aplicar(dados: Autenticacao): void {
        this.autenticacao = dados;
        this.storage.setCookie('token', this.autenticacao.token);
    }

    autenticar(params: AutenticarParam): Observable<Autenticacao> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });

        let body = new HttpParams();
        body = HttpParamsHelper.setObject(body, params);

        return this.http.post<any>(`${AppConfig.api}/autenticacao`, body, { headers: headers })
        .pipe(
            tap((dados: Autenticacao) => {
                this.aplicar(dados);
            })
        );
    }

}

interface AutenticarParam {
  login?: string;
  senha?: string;
}