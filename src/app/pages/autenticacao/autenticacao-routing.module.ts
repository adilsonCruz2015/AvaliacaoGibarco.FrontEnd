import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutenticacaoLoginComponent } from './autenticacao-login/autenticacao-login.component';


const routes: Routes = [
  {
      path: 'autenticacao',
      component: AutenticacaoLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutenticacaoRoutingModule { }
