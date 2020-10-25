import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CalculatorService } from './calculator.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
  @ViewChild('input') _input: ElementRef<HTMLInputElement>;

  constructor(private calculator: CalculatorService) {}

  ngOnInit(): void {}

  evaluate() {
    const result = this.calculator.evaluate(this._input.nativeElement.value);
    alert(result);
  }
}
