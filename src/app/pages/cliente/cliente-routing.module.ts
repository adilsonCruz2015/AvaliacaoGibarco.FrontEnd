import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteBuscaComponent } from './cliente-busca/cliente-busca.component';
import { ClienteGerenciaComponent } from './cliente-gerencia/cliente-gerencia.component';

const routes: Routes = [
  {
      path: '',
      component: ClienteBuscaComponent
  },
  {
       path: 'cadastro',
       component: ClienteGerenciaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
