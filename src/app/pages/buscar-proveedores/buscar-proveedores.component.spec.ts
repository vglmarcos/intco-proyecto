import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarProveedoresComponent } from './buscar-proveedores.component';

describe('BuscarProveedoresComponent', () => {
  let component: BuscarProveedoresComponent;
  let fixture: ComponentFixture<BuscarProveedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarProveedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
