import { Component, OnInit } from '@angular/core';
import { ObjectsWasmService } from './objects.wasm.service';

@Component({
  selector: 'app-objects',
  templateUrl: './objects.component.html',
  styleUrls: ['./objects.component.scss'],
})
export class ObjectsComponent implements OnInit {
  constructor(private objectsWasm: ObjectsWasmService) {}

  ngOnInit(): void {}
}
