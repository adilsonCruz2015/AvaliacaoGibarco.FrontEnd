import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';

import { Observable } from 'rxjs';

import { HttpParamsHelper } from '../helpers/http-params-helper';
import { AppConfig } from 'src/app/app.config';
import { Pais } from '../modelos/pais.model';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class PaisServico {

    constructor(private http: HttpClient) { }

    filtrar(params?: FiltrarParams, ignoreLoading?: boolean): Observable<Pais[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
            'App-Ignore-Loading': ignoreLoading ? 'true' : 'false'
        });

        let body = new HttpParams();
        body = HttpParamsHelper.setObject(body, params);

        return this.http.get<Pais[]>(`${AppConfig.api}/pais`, {
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

        return this.http.post<Pais>(`${AppConfig.api}/pais`, body, {
          headers
        }).pipe(map(dados => dados['success']));
      }
}

interface FiltrarParams {
    descricao?: string[] | string;
}

interface InserirParams {
    descricao?: string;
 }
