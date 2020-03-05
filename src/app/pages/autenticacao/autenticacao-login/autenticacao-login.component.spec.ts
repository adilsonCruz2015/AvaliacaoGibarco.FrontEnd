import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutenticacaoLoginComponent } from './autenticacao-login.component';

describe('AutenticacaoLoginComponent', () => {
  let component: AutenticacaoLoginComponent;
  let fixture: ComponentFixture<AutenticacaoLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutenticacaoLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutenticacaoLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
