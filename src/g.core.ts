export * from './components';
export * from './lib';

export namespace metadata {
	export const name: string = 'Giant Engine';
	export const version: string = '0.2.0';
}

Object.freeze(metadata);

export namespace core {
	let uniqueId: number = Math.floor(Math.random() * 100000);
	const cancelFrame = (global as any).cancelAnimationFrame || (() => null);
	const requestFrame =
		(global as any).requestAnimationFrame ||
		(global as any).webkitRequestAnimationFrame ||
		(global as any).mozRequestAnimationFrame ||
		framePolyfill;

	function framePolyfill(callback: FrameRequestCallback) {
		const currTime = Date.now();
		let clock = Date.now();

		if (currTime - clock > 16) {
			clock = currTime;
			callback(currTime);
		} else {
			framePolyfill(callback);
		}
	}

	export function getUniqueId() {
		return ++uniqueId;
	}

	export function requestNextFrame(callback: FrameRequestCallback): void {
		requestFrame(callback);
	}

	export function cancelRequestFrame(handle: number) {
		return cancelFrame(handle);
	}

}

Object.freeze(core);
