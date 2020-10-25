import { loadScript } from "../tools/load";
import { IEmscriptenModule } from "../models/IEmscriptenModule";

export abstract class NgWasmService<T = Object> {
	private _module: IEmscriptenModule & T;

	get module(): IEmscriptenModule & T{
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
		this._module = <IEmscriptenModule & T>{
			locateFile: (file: string) => {
				return `/assets/wasm/${file}`;
			},
		};
		await window[this.moduleExportName](this._module);
		if (this.onInit) {
			this.onInit();
		}
	}

	protected readString(pointer: number) {
		let s = "";
		for (let i = pointer; this.module.HEAPU8[i]; i++) {
			s += String.fromCharCode(this.module.HEAPU8[i]);
		}
		return s;
	}

	/* Uint8Array */

	protected writeUint8Array(data: Uint8Array) {
		const pointer = this._module._malloc(data.length);
		this._module.HEAPU8.set(data, pointer);
		return pointer;
	}

	protected readUint8Array(pointer: number, size: number) {
		return this.module.HEAPU8.slice(pointer, pointer + size);
	}

	/* Uint8Array end */

	/* Int8Array */

	protected writeInt8Array(data: Int8Array) {
		const pointer = this._module._malloc(data.length);
		this._module.HEAP8.set(data, pointer);
		return pointer;
	}

	protected readInt8Array(pointer: number, size: number) {
		return this.module.HEAP8.slice(pointer, pointer + size);
	}

	/* Int8Array end */

	/* Uint16Array */

	protected writeUint16Array(data: Uint16Array) {
		const pointer = this._module._malloc(
			data.length * Uint16Array.BYTES_PER_ELEMENT
		);
		this._module.HEAPU16.set(data, pointer / Uint16Array.BYTES_PER_ELEMENT);
		return pointer;
	}

	protected readUint16Array(pointer: number, size: number) {
		return this.module.HEAPU16.slice(
			pointer / Uint16Array.BYTES_PER_ELEMENT,
			pointer / Uint16Array.BYTES_PER_ELEMENT + size
		);
	}

	/* Uint16Array end */

	/* Int16Array */

	protected writeInt16Array(data: Int16Array) {
		const pointer = this._module._malloc(
			data.length * Int16Array.BYTES_PER_ELEMENT
		);
		this._module.HEAP16.set(data, pointer / Int16Array.BYTES_PER_ELEMENT);
		return pointer;
	}

	protected readInt16Array(pointer: number, size: number) {
		return this.module.HEAP16.slice(
			pointer / Int16Array.BYTES_PER_ELEMENT,
			pointer / Int16Array.BYTES_PER_ELEMENT + size
		);
	}

	/* Int16Array end */

	/* Uint32Array */

	protected writeUint32Array(data: Uint32Array) {
		const pointer = this._module._malloc(
			data.length * Uint32Array.BYTES_PER_ELEMENT
		);
		this._module.HEAPU32.set(data, pointer / Uint32Array.BYTES_PER_ELEMENT);
		return pointer;
	}

	protected readUint32Array(pointer: number, size: number) {
		return this.module.HEAPU32.slice(
			pointer / Uint32Array.BYTES_PER_ELEMENT,
			pointer / Uint32Array.BYTES_PER_ELEMENT + size
		);
	}

	/* Uint32Array end */

	/* Int32Array */

	protected writeInt32Array(data: Int32Array) {
		const pointer = this._module._malloc(
			data.length * Int32Array.BYTES_PER_ELEMENT
		);
		this._module.HEAP32.set(data, pointer / Int32Array.BYTES_PER_ELEMENT);
		return pointer;
	}

	protected readInt32Array(pointer: number, size: number) {
		return this.module.HEAP32.slice(
			pointer / Int32Array.BYTES_PER_ELEMENT,
			pointer / Int32Array.BYTES_PER_ELEMENT + size
		);
	}

	/* Int32Array end */
}
