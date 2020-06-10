import { TestBed } from '@angular/core/testing';

import { NgWasmService } from './ng-wasm.service';

describe('NgWasmService', () => {
  let service: NgWasmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgWasmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
