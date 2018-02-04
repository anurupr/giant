import { core } from '../g.core';
import { AssetManager } from './common';
import { Renderer2D } from './graphics';
import { Scene } from './scene';

export class Game {
	public name: string = 'Game | Made with Giant';
	public fps: number = 0;
	public debugMode: boolean = true;

	private lastMilisecond: number = 0;
	private startDirty: boolean = false;
	private sceneStack: Scene[] = [];

	constructor(
		public renderer: Renderer2D,
		public assetManager: AssetManager,
	) {}

	public pushScene(scene: Scene) {
		this.sceneStack.push(scene);
		if (this.startDirty) {
			scene.onStart();
		}
	}

	public popScene(): Scene|undefined {
		const scene = this.sceneStack.pop();
		if (scene) {
			scene.onDestroy();
			return scene;
		}
	}

	public getActiveScene(): Scene {
		return this.sceneStack[this.sceneStack.length - 1];
	}

	public start(): void {
		this.startDirty = true;
		const activeScene: Scene = this.getActiveScene();
		if (activeScene) {
			activeScene.setRenderer(this.renderer);
			activeScene.onStart();
		}

		core.requestNextFrame(this.loop.bind(this));
	}

	private loop(ms: number): void {
		const dt = (ms - this.lastMilisecond) / 0.001;
		this.lastMilisecond = ms;
		this.fps = Math.floor(1 / dt);

		const activeScene: Scene = this.getActiveScene();
		if (activeScene) {
			activeScene.update(ms, dt);
			activeScene.draw(ms, dt);
		}

		core.requestNextFrame(this.loop.bind(this));
	}
}

Object.seal(Game);
