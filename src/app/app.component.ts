import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificacaoService } from './core/servicos/notificacao.service';
import { AutenticacaoService } from './core/servicos/autenticacao.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router,
              private notificacao: NotificacaoService,
              private autenticacao: AutenticacaoService) {}
  title = 'Avaliação Gibarco';

  estaComProblemas = false;

  ngOnInit(): void {
    this.estaComProblemas = this.autenticacao.autenticado ? true : false;

    this.autenticacao.eventSaida.subscribe(success => {
      this.router.navigate(['/autenticacao']);
    });
  }
}
