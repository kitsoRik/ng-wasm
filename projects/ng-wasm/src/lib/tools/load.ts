import { async } from "@angular/core/testing";

export function loadScript(id: string, url: string): Promise<any> {
	let script = <HTMLScriptElement>document.getElementById(id);
	if (script) {
		return Promise.resolve();
	}
	return new Promise<void>((resolve, reject) => {
		script = document.createElement("script");
		document.body.appendChild(script);

		script.onload = () => resolve();
		script.onerror = (ev: ErrorEvent) => console.log(ev);
		script.id = id;
		script.async = true;
		script.src = url;
	});
}
