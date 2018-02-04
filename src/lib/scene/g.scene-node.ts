import { core } from '../../g.core';
import { TreeNode } from '../common';
import { Renderer2D } from '../graphics';
import { Transform2D } from '../matrix';
import { Scene } from './g.scene';

export abstract class SceneNode extends TreeNode {
	public readonly ID: number = core.getUniqueId();
	public transform: Transform2D = new Transform2D();
	public renderer: Renderer2D;
	private scene: Scene;

	public set(obj: SceneNode): this {
		Object.assign(this, obj);
		return this;
	}

	public setScene(scene: Scene): this {
		this.scene = scene;
		return this;
	}

	public setRenderer(renderer: Renderer2D): this {
		this.renderer = renderer;
		return this;
	}

	public abstract onStart?(): void;
	public abstract onPreUpdate?(ms: number, dt: number): void;
	public abstract onUpdate?(ms: number, dt: number): void;
	public abstract onPostUpdate?(ms: number, dt: number): void;
	public abstract onPreDraw?(ms: number, dt: number): void;
	public abstract onDraw?(ms: number, dt: number): void;
	public abstract onPostDraw?(ms: number, dt: number): void;
	public abstract onDestroy?(): void;

	public equals(obj: SceneNode): boolean {
		return this.ID === obj.ID;
	}

}
