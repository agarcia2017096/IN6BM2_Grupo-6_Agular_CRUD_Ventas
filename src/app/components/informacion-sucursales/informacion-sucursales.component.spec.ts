import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionSucursalesComponent } from './informacion-sucursales.component';

describe('InformacionSucursalesComponent', () => {
  let component: InformacionSucursalesComponent;
  let fixture: ComponentFixture<InformacionSucursalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionSucursalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionSucursalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
