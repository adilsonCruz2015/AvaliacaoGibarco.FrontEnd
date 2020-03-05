import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PaisRoutingModule } from './pais-routing.module';
import { PaisCadastroComponent } from './pais-cadastro/pais-cadastro.component';

@NgModule({
  declarations: [PaisCadastroComponent],
  imports: [
    CommonModule,
    PaisRoutingModule,
    ReactiveFormsModule
  ]
})
export class PaisModule { }
