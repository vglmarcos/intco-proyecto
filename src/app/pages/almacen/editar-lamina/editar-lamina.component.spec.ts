import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarLaminaComponent } from './editar-lamina.component';

describe('EditarLaminaComponent', () => {
  let component: EditarLaminaComponent;
  let fixture: ComponentFixture<EditarLaminaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarLaminaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarLaminaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
