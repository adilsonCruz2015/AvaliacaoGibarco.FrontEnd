import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';

import { Observable } from 'rxjs';

import { HttpParamsHelper } from '../helpers/http-params-helper';
import { AppConfig } from 'src/app/app.config';
import { map } from 'rxjs/operators';
import { Cliente } from '../modelos/cliente.model';


@Injectable({
    providedIn: 'root'
})
export class ClienteServico {

    constructor(private http: HttpClient) { }

    filtrar(params?: FiltrarParams): Observable<Cliente[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8'
        });

        let body = new HttpParams();
        body = HttpParamsHelper.setObject(body, params);

        return this.http.get<Cliente[]>(`${AppConfig.api}/cliente`, {
            params : body,
            headers
          });
    }

    inserir(params: InserirParams): Observable<boolean> {
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
        });

        let body = new HttpParams();
        body = HttpParamsHelper.setObject(body, params);

        return this.http.post<Cliente>(`${AppConfig.api}/cliente`, body, {
          headers
        }).pipe(map(dados => dados['success']));
      }
}

interface FiltrarParams {
    cnpj?: string[] | string;
    razaSocial?: string[] | string;
    pais?: string[] | string;
}

interface InserirParams {
    cnpj?: string[] | string;
    razaoSocial?: string[] | string;
    pais?: string[] | string;
 }
