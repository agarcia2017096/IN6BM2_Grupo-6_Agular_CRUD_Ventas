import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosEmpresasComponent } from './productos-empresas.component';

describe('ProductosEmpresasComponent', () => {
  let component: ProductosEmpresasComponent;
  let fixture: ComponentFixture<ProductosEmpresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosEmpresasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
