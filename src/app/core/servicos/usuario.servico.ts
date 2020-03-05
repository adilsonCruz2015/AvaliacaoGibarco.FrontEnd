import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpParamsHelper } from '../helpers/http-params-helper';
import { AppConfig } from 'src/app/app.config';
import { Usuario } from '../modelos/usuario.model';

@Injectable({
    providedIn: 'root'
})
export class UsuarioServico {

    constructor(private http: HttpClient) { }

    logar(params: LogarParams): Observable<boolean> {
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
        });

        let body = new HttpParams();
        body = HttpParamsHelper.setObject(body, params);

        return this.http.post<Usuario>(`${AppConfig.api}/autenticacao`, body, {
          headers
        }).pipe(map(dados => dados['success']));
      }
}

interface LogarParams {
  email?: string;
  senha?: string;
}
