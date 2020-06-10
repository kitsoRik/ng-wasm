import { ICcallOptions } from "./ICcallOptions";
import { IEmscriptenReadFileOptions } from "./IEmscriptenReadFileOptions";

export interface IEmscriptenModule {
	HEAP8: Int8Array;
	HEAPU8: Uint8Array;
	HEAP16: Int16Array;
	HEAPU16: Uint16Array;
	HEAP32: Int32Array;
	HEAPU32: Uint32Array;

	arguments?: string[];
	print?(what: string): void;
	printErr?(what: string): void;
	locateFile?(file: string): string;
	ccall?(
		funcName: string,
		returnType: string,
		argumentTypes: string[],
		_arguments: any[],
		options?: ICcallOptions
	): any;
	preRun?: Function[];
	postRun?: Function[];
	canvas?: HTMLCanvasElement;
	FS_createDataFile?(
		parent: string,
		name: string,
		data: string | Uint8Array,
		canRead?: boolean,
		canWrite?: boolean,
		canOwn?: boolean
	): void;
	FS_createPreloadedFile?(
		parent: string,
		name: string,
		url: string,
		canRead?: boolean,
		canWrite?: boolean
	): void;
	FS_readFile?(url: string, options?: IEmscriptenReadFileOptions): any;
	FS_unlink?(path: string): void;

	_malloc(length: number): number;
	_free(length: number): number;
}
