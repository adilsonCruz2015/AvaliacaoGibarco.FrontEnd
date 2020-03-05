import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteBuscaComponent } from './cliente-busca/cliente-busca.component';
import { ClienteGerenciaComponent } from './cliente-gerencia/cliente-gerencia.component';

@NgModule({
  declarations: [ClienteBuscaComponent, ClienteGerenciaComponent],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    ReactiveFormsModule
  ]
})
export class ClienteModule { }
