import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteGerenciaComponent } from './cliente-gerencia.component';

describe('ClienteGerenciaComponent', () => {
  let component: ClienteGerenciaComponent;
  let fixture: ComponentFixture<ClienteGerenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteGerenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteGerenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
