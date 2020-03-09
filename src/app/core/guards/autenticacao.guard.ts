import { CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AutenticacaoService } from '../servicos/autenticacao.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AutenticacaoGuard implements CanActivate, CanLoad {

    constructor(private autenticacao: AutenticacaoService) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<boolean> | boolean {
          return this.autenticacao.checarRestaurar().pipe(take(1));
    }

    canLoad(
        route: Route
       ): Observable<boolean> | boolean {
        return this.autenticacao.checarRestaurar().pipe(take(1))
    }
}