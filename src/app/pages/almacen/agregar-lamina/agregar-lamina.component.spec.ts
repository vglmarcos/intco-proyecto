import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarLaminaComponent } from './agregar-lamina.component';

describe('AgregarLaminaComponent', () => {
  let component: AgregarLaminaComponent;
  let fixture: ComponentFixture<AgregarLaminaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarLaminaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarLaminaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
