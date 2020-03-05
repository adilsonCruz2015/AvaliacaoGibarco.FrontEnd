import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutenticacaoRoutingModule } from './autenticacao-routing.module';
import { AutenticacaoLoginComponent } from './autenticacao-login/autenticacao-login.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AutenticacaoLoginComponent],
  imports: [
    CommonModule,
    AutenticacaoRoutingModule,
    ReactiveFormsModule
  ]
})
export class AutenticacaoModule { }
