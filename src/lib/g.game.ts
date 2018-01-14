import { core } from '../g.core';
import { AssetManager } from './g.asset-manager';
import { Renderer2D } from './graphics';
import { Scene } from './scene';

export class Game {
	public readonly name: string = 'Game | Made with Giant';
	public fps: number = 0;
	public canvas: object = { };
	public context: object = { };
	public size: object = { };
	public debug: boolean = true;

	private sceneStack: Scene[] = [];
	private lastTime: number = 0;
	private startDirty: boolean = false;

	constructor(public readonly renderer: Renderer2D, public readonly assetManager: AssetManager) {

	}

	public pushScene(scene: Scene) {
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

	public getActiveScene(): Scene {
		return this.sceneStack[this.sceneStack.length - 1];
	}

	public start(): void {
		this.startDirty = true;
		const activeScene: Scene = this.getActiveScene();
		if (activeScene) {
			activeScene.onStart();
		}

		core.requestNextFrame(this.update.bind(this));
	}

	private update(ms: number): void {
		const dt = (ms - this.lastTime) / 0.001;
		this.lastTime = ms;
		this.fps = Math.floor(1 / dt);

		const activeScene: Scene = this.getActiveScene();
		if (activeScene) {
			activeScene.onPreUpdate(ms, dt);
			activeScene.onUpdate(ms, dt);
			activeScene.onPostUpdate(ms, dt);
			activeScene.onPreDraw(ms, dt);
			activeScene.onDraw(ms, dt);
			activeScene.onPostDraw(ms, dt);
		}

		core.requestNextFrame(this.update.bind(this));
	}
}

Object.seal(Game);
