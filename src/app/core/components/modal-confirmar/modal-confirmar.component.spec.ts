import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmarComponent } from './modal-confirmar.component';

describe('ModalConfirmarComponent', () => {
  let component: ModalConfirmarComponent;
  let fixture: ComponentFixture<ModalConfirmarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConfirmarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfirmarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
