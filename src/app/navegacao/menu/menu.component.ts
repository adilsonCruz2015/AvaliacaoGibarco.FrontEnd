import { Component } from '@angular/core';
import { AutenticacaoService } from '@app/core/servicos/autenticacao.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent  {
  constructor(private autenticacao: AutenticacaoService) {}

  estaAutenticado(): boolean {
    return this.autenticacao.autenticado;
  }
}
