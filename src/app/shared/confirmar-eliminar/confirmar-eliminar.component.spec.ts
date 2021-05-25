import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarEliminarComponent } from './confirmar-eliminar.component';

describe('ConfirmarEliminarComponent', () => {
  let component: ConfirmarEliminarComponent;
  let fixture: ComponentFixture<ConfirmarEliminarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmarEliminarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
