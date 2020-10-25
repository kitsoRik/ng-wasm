import { Injectable } from '@angular/core';
import { NgWasmService } from 'projects/ng-wasm/src/public-api';
import { Record } from './types/record.type';

type ObjectsServiceType = {
  createRecord: (firstName: string, lastName: string, age: number) => Record;
};

@Injectable({
  providedIn: 'root',
})
export class ObjectsWasmService extends NgWasmService<ObjectsServiceType> {
  constructor() {
    super('ObjectsModule', 'objects.js');
  }

  getRecord(firstName: string, lastName: string, age: number): Record {
    return this.module.createRecord(firstName, lastName, age);
  }

  onInit = () => {
    console.log(this.getRecord('qwe', 'qwe', 123));
  };
}
