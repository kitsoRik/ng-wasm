import { Injectable } from "@angular/core";
import { CalculatorWasmService } from "./calculator-wasm.service";

@Injectable({
	providedIn: "root",
})
export class CalculatorService {
	constructor(private calculatorWasmService: CalculatorWasmService) {}

	evaluate(expression: string) {
		return this.calculatorWasmService.evaluate(expression);
	}
}
