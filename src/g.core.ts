export * from './lib';

export namespace metadata {
	export const name: string = 'Giant Engine';
	export const version: string = 'v0.1.8';
}

Object.freeze(metadata);

export namespace core {
	export const root: string = 'src/';
	export const libraries: string = 'libraries/';
}

Object.freeze(core);

export namespace game {
	export const name: string = 'Game | Made with Giant';
	export let fps: number = 0;
	export let deltaTime: number = 0;
	export let path: string = '';
	export let canvas: object = { };
	export let context: object = { };
	export let size: object = { };
	export let debug: boolean = true;

	export let uniqueId: number = Date.now();

	export function getUniqueId() {
		return ++game.uniqueId;
	}

	export function bindUniqueId(rec: object) {
		Object.defineProperty(rec, 'id', {
			value: game.getUniqueId(),
		});
	}

	const framePolyfill = (() => {
		let clock = Date.now();

		return (callback: (time: number) => any) => {
			const currTime = Date.now();

			if (currTime - clock > 16) {
				clock = currTime;
				callback(currTime);
			} else {
				setTimeout(() => framePolyfill(callback), 0);
			}
		};
	})();

	const requestFrame =
		(window as any).requestAnimationFrame       ||
		(window as any).webkitRequestAnimationFrame ||
		(window as any).mozRequestAnimationFrame    ||
		framePolyfill;

	export function bindRequestFrame(callback: (time: number) => any, who: object): number {
		const req = requestFrame ? requestFrame.bind(window) : null;
		return req(callback.bind(who));
	}

	const cancelFrame =
		(window as any).cancelAnimationFrame;

	export function cancelRequestFrame(handle: number) {
		const cancel = cancelFrame ? cancelFrame.bind(window) : null;
		return cancel(handle);
	}
}

Object.seal(game);
