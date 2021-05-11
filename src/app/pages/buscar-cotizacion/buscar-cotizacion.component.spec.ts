import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarCotizacionComponent } from './buscar-cotizacion.component';

describe('BuscarCotizacionComponent', () => {
  let component: BuscarCotizacionComponent;
  let fixture: ComponentFixture<BuscarCotizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarCotizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
