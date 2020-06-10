import { IEmscriptenModule } from "../models/IEmscriptenModule";

export function UTF8ToString(module: IEmscriptenModule, offset: number) {
	let s = "";
	for (let i = offset; module.HEAPU8[i]; i++) {
		s += String.fromCharCode(module.HEAPU8[i]);
	}
	return s;
}

export function UTF8ToUint8Array(
	module: IEmscriptenModule,
	offset: number,
	size: number
) {
	return module.HEAPU8.slice(offset, offset + size);
}
