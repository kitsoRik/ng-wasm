import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgWasmComponent } from "./component/ng-wasm.component";
import { NgWasmService } from "./service/ng-wasm.service";

@NgModule({
	declarations: [NgWasmComponent],
	imports: [CommonModule],
	exports: [],
	providers: [],
})
export class NgWasmModule {}
