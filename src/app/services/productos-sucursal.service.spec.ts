import { TestBed } from '@angular/core/testing';

import { ProductosSucursalService } from './productos-sucursal.service';

describe('ProductosSucursalService', () => {
  let service: ProductosSucursalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductosSucursalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
