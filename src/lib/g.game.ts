import { AssetManager } from './g.asset-manager';
import { Renderer2D } from './graphics';
import { IScene } from './scene';

export class Game {
	public static getUniqueId() {
		return ++Game.uniqueId;
	}

	private static uniqueId: number = Math.floor(Math.random() * 100000);

	public readonly name: string = 'Game | Made with Giant';
	public fps: number = 0;
	public canvas: object = { };
	public context: object = { };
	public size: object = { };
	public debug: boolean = true;

	private sceneStack: IScene[] = [];
	private lastTime: number = 0;
	private startDirty: boolean = false;

	constructor(public readonly renderer: Renderer2D, public readonly assetManager: AssetManager) {

	}

	public pushScene(scene: IScene) {
		this.sceneStack.push(scene);
		if (this.startDirty) {
			scene.onStart();
		}
	}

	public popScene() {
		const scene = this.sceneStack.pop();
		if (scene) {
			scene.onDestroy();
		}
	}

	public start(): void {
		this.startDirty = true;
		const activeScene: IScene = this.sceneStack[this.sceneStack.length - 1];
		if (activeScene) {
			activeScene.onStart();
		}

		bindRequestFrame(this.update, this);
	}

	private update(ms: number): void {
		const dt = (ms - this.lastTime) * 0.001;
		this.lastTime = ms;
		this.fps = Math.floor(1 / dt);

		const activeScene: IScene = this.sceneStack[this.sceneStack.length - 1];
		if (activeScene) {
			activeScene.onPreUpdate(ms, dt);
			activeScene.onUpdate(ms, dt);
			activeScene.onPostUpdate(ms, dt);

			this.renderer.clear();
			activeScene.onPreDraw(ms, dt);
			activeScene.onDraw(ms, dt);
			activeScene.onPostDraw(ms, dt);
		}

		bindRequestFrame(this.update, this);
	}
}

Object.seal(Game);

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
	(global as any).requestAnimationFrame ||
	(global as any).webkitRequestAnimationFrame ||
	(global as any).mozRequestAnimationFrame ||
	framePolyfill;

export function bindRequestFrame(callback: (time: number) => any, who: object): number {
	const req = requestFrame ? requestFrame.bind(window) : () => null;
	return req(callback.bind(who));
}

const cancelFrame = (global as any).cancelAnimationFrame;

export function cancelRequestFrame(handle: number) {
	const cancel = cancelFrame ? cancelFrame.bind(window) : () => null;
	return cancel(handle);
}
