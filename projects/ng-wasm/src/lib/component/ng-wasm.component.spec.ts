import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgWasmComponent } from './ng-wasm.component';

describe('NgWasmComponent', () => {
  let component: NgWasmComponent;
  let fixture: ComponentFixture<NgWasmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgWasmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgWasmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
