import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaisCadastroComponent } from './pais-cadastro/pais-cadastro.component';

const routes: Routes = [
  {
     path: 'cadastro',
     component: PaisCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaisRoutingModule { }
