import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {  HttpErrorResponse } from '@angular/common/http';

import { Observable, fromEvent, merge, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { Usuario } from 'src/app/core/modelos/usuario.model';

import { ValidationMessages, GenericValidator, DisplayMessage } from 'src/app/core/modelos/generic-form-validation';
import { UsuarioServico } from 'src/app/core/servicos/usuario.servico';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autenticacao-login',
  templateUrl: './autenticacao-login.component.html',
  styleUrls: ['./autenticacao-login.component.css']
})


export class AutenticacaoLoginComponent implements OnInit {

    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

cadastroForm: FormGroup;
usuario: Usuario;

validationMessages: ValidationMessages;
genericValidator: GenericValidator;
displayMessage: DisplayMessage = {};
mudancasNaoSalvas: boolean;

constructor(private fb: FormBuilder,
            private usuarioServico: UsuarioServico,
            private toastr: ToastrService,
            public router: Router) {

  this.validationMessages = {
    senha: {
      required: 'O Senha é requerido',
      minlength: 'O Senha precisa ter no mínimo 3 caracteres',
      maxlength: 'O Senha precisa ter no máximo 20 caracteres'
    },
    email: {
      email: 'Email inválido'
    }
  };

  this.genericValidator = new GenericValidator(this.validationMessages);
  }

ngAfterViewInit(): void {
  const controlBlurs: Observable<any>[] = this.formInputElements
  .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

  merge(...controlBlurs).subscribe(() => {
    this.displayMessage = this.genericValidator.processarMensagens(this.cadastroForm);
    this.mudancasNaoSalvas = true;
  });
}

ngOnInit() {

  this.cadastroForm = this.fb.group({
    email: ['', [Validators.email]],
    senha: ['']
  });

}

onSubmit() {
  if (this.cadastroForm.dirty && this.cadastroForm.valid) {

    this.usuarioServico.logar({
      email: this.cadastroForm.get('email').value,
      senha: this.cadastroForm.get('senha').value,
      }).pipe(
        catchError((error: HttpErrorResponse) => {

          if(error.status === 400) {
            this.toastr.error(error.error.errors[0]);
          }
          return from([]);
        })
      ).subscribe(() => {
        this.onReset();
        this.router.navigate(['/cliente']);
      });

    this.mudancasNaoSalvas = false;
  }
}

onReset(): void {
  this.cadastroForm.reset();
}

goBack(): void {
  this.router.navigate(['/usuario']);
}
  
  }