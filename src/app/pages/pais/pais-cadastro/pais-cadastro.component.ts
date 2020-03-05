import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pais } from 'src/app/core/modelos/pais.model';
import { ValidationMessages, GenericValidator, DisplayMessage } from 'src/app/core/modelos/generic-form-validation';
import { PaisServico } from 'src/app/core/servicos/pais.servico';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Observable, fromEvent, merge, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-pais-cadastro',
  templateUrl: './pais-cadastro.component.html',
  styleUrls: ['./pais-cadastro.component.css']
})
export class PaisCadastroComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  cadastroForm: FormGroup;
  pais: Pais;

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};
  mudancasNaoSalvas: boolean;

  constructor(private fb: FormBuilder,
             private paisService: PaisServico,
             private toastr: ToastrService,
             public router: Router) { 

              this.validationMessages = {
                descricao: {
                  required: 'O Descrição é requerido',
                  minlength: 'O Descrição precisa ter no mínimo 2 caracteres',
                  maxlength: 'O Descrição precisa ter no máximo 100 caracteres'
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
      descricao: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    });
  }

  onSubmit() {
    this.paisService.inserir({
      descricao: this.cadastroForm.get('descricao').value
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === 400) {
          this.toastr.error(error.error.errors[0]);
        }
        return from([]);
      })
    ).subscribe(() => {
      this.onReset();
          this.toastr.success('Cadastro realizado com sucesso!', 'Cadastro País');
    });
    this.mudancasNaoSalvas = false;
  }

  onReset(): void {
    this.cadastroForm.reset();
  }

  goBack(): void {    
    this.router.navigate(['/cliente']);
  }
}
