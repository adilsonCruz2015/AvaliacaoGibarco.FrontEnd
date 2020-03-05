import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cliente } from 'src/app/core/modelos/cliente.model';
import { Pais } from 'src/app/core/modelos/pais.model';
import { ValidationMessages, GenericValidator, DisplayMessage } from 'src/app/core/modelos/generic-form-validation';
import { PaisServico } from 'src/app/core/servicos/pais.servico';
import { ClienteServico } from 'src/app/core/servicos/cliente.servico';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Observable, fromEvent, merge, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cliente-gerencia',
  templateUrl: './cliente-gerencia.component.html',
  styleUrls: ['./cliente-gerencia.component.css']
})
export class ClienteGerenciaComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  cadastroForm: FormGroup;
  cliente: Cliente;
  paises: Pais[];

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};
  mudancasNaoSalvas: boolean;
  
  constructor(private fb: FormBuilder,
              private paisService: PaisServico,
              private clienteService: ClienteServico,
              private toastr: ToastrService,
              public router: Router) { 

    this.validationMessages = {
      cnpj: {
        required: 'O Cnpj é requerido',
        maxlength: 'O Cnpj precisa ter no máximo 18 caracteres'
      },
      razaoSocial: {
        required: 'Informe a Razão Social'
      },
      pais: {
        required: 'O País é requerido',
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
    this.paisService.filtrar().pipe()
    .subscribe((dados) => {  this.paises = dados['data'] });

    this.cadastroForm = this.fb.group({
      cnpj: ['', [Validators.required, Validators.maxLength(200)]],
      razaoSocial:  ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      pais: ['', [Validators.required]]
    })
  }

  onSubmit() {
    if (this.cadastroForm.dirty && this.cadastroForm.valid) {
       this.clienteService.inserir({
         cnpj: this.cadastroForm.get('cnpj').value,
         razaoSocial: this.cadastroForm.get('razaoSocial').value,
         pais: this.cadastroForm.get('pais').value
       }).pipe(
         catchError((error: HttpErrorResponse) => {
           if(error.status === 400) {
             this.toastr.error(error.error.errors[0]);
           }
           return from([]);
         })
       ).subscribe(() => {
         this.onReset();
         this.toastr.success('Cadastro realizado com sucesso!', 'Cadastro Usuário');
       });
       this.mudancasNaoSalvas = false;
    }
  }

  onReset(): void {
    this.cadastroForm.reset();
  }

  goBack(): void {
    this.router.navigate(['/cliente']);
  }

}
