import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { of, from } from 'rxjs';

import { ClienteServico } from 'src/app/core/servicos/cliente.servico';
import { Cliente } from 'src/app/core/modelos/cliente.model';
import { PaisServico } from 'src/app/core/servicos/pais.servico';
import { Pais } from 'src/app/core/modelos/pais.model';

@Component({
  selector: 'app-cliente-busca',
  templateUrl: './cliente-busca.component.html',
  styleUrls: ['./cliente-busca.component.css']
})
export class ClienteBuscaComponent implements OnInit {

  constructor(private clienteServico: ClienteServico,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private paisService: PaisServico) { }

  buscaForm: FormGroup;
  clientes: Cliente[];
  naoEncontrado = false;
  executando = false;
  paises: Pais[];

  ngOnInit() {

    this.paisService.filtrar().pipe()
    .subscribe((dados) => {  this.paises = dados['data'] });

    this.buscaForm = this.fb.group({
      cnpj: [''],
      razaoSocial: [''],
      pais: ['']
    });

    this.onSubmit();
  }

  onSubmit(): void {
    this.naoEncontrado = false;
    this.clienteServico.filtrar({
      cnpj: this.buscaForm.value.cnpj,
      razaSocial: this.buscaForm.value.razaoSocial,
      pais: this.buscaForm.value.pais
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          this.clientes = null;
          this.naoEncontrado = true;
        }
        return from([]);
      })
    ).subscribe((dados) => {
      this.clientes = dados['data'];
    });
  }

  onReset(): void {
    this.buscaForm.reset();
    this.buscaForm.controls.pais.setValue('Selecione ...', { onlySelf: true });
    this.onSubmit();
  }
}
