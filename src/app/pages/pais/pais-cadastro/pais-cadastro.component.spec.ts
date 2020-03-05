import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaisCadastroComponent } from './pais-cadastro.component';

describe('PaisCadastroComponent', () => {
  let component: PaisCadastroComponent;
  let fixture: ComponentFixture<PaisCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaisCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaisCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
