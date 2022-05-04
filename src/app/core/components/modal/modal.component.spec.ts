import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  // Servicios
  let ngbActiveModal: NgbActiveModal;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
      imports: [],
      providers: [NgbActiveModal]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;

    ngbActiveModal = TestBed.inject(NgbActiveModal);

    fixture.detectChanges();
  });

  it('deberia crear el componente', () => {

    expect(component).toBeTruthy();
  });

  it('deberia cerrar el modal', () => {
    spyOn(ngbActiveModal, 'close');

    component.cerrarModal(true);
    expect(ngbActiveModal.close).toHaveBeenCalled();
  });

});
