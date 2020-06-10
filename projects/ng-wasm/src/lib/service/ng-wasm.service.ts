import { loadScript } from "../tools/load";
import { IEmscriptenModule } from "../models/IEmscriptenModule";
import { UTF8ToString, UTF8ToUint8Array } from "../tools/data";

export abstract class NgWasmService {
	private _module: IEmscriptenModule;

	get module(): IEmscriptenModule {
		return this._module;
	}

	protected onInit: Function;

	protected constructor(
		private moduleExportName: string,
		private wasmJavaScriptLoader: string
	) {
		this.resolveModule();
	}

	private async resolveModule(): Promise<void> {
		await loadScript(
			this.moduleExportName,
			`/assets/wasm/${this.wasmJavaScriptLoader}`
		);
		this._module = <IEmscriptenModule>{
			locateFile: (file: string) => {
				return `/assets/wasm/${file}`;
			},
		};
		await window[this.moduleExportName](this._module);
		if (this.onInit) {
			this.onInit();
		}
	}

	protected readString(offset: number) {
		return UTF8ToString(this.module, offset);
	}

	protected writeUint8Array(data: Uint8Array) {
		const pointer = this._module._malloc(data.length);
		this._module.HEAPU8.set(data, pointer);
		return pointer;
	}

	protected readUint8Array(pointer: number, size: number) {
		const res = UTF8ToUint8Array(this.module, pointer, size);
		console.log(res instanceof Uint8Array);
		return res;
	}
}
