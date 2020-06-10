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
		console.log(
			this.readUint8Array(
				this.module.ccall(
					"test",
					"uint8_t*",
					["uint8_t"],
					[this.writeUint8Array(new Uint8Array([1, 2, 3]))]
				),
				3
			)
		);
		try {
			return this.module.ccall(
				"evaluate",
				"double",
				["string"],
				[expression]
			);
		} catch (e) {
			alert("Error");
			console.log(e);
			return 228;
		}
	}
}
