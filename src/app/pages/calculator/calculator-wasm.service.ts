import { Injectable } from "@angular/core";
import { NgWasmService } from "projects/ng-wasm/src/public-api";

@Injectable({
	providedIn: "root",
})
export class CalculatorWasmService extends NgWasmService {
	constructor() {
		super("CalculatorModule", "calculator.js");
	}

	evaluate(expression: string): number {
		try {
			return this.module.ccall(
				"evaluate",
				"double",
				["string"],
				[expression]
			);
		} catch (e) {
			alert("Error");
			throw `Pointer in runtime_error: ${e}`;
		}
	}
}
