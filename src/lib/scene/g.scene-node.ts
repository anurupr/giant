import { Game } from '../g.game';

export abstract class SceneNode {
	public readonly ID: number = Game.getUniqueId();
	public children: SceneNode[] = [];

	public set(obj: SceneNode): SceneNode {
		Object.assign(this, obj);
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

}
