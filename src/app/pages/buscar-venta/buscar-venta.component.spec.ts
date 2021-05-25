import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarVentaComponent } from './buscar-venta.component';

describe('BuscarVentaComponent', () => {
  let component: BuscarVentaComponent;
  let fixture: ComponentFixture<BuscarVentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarVentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
