import { SceneNode } from './g.scene-node';

export interface IScene {
	collection: SceneNode[];
	onStart(): void;
	onPreUpdate(ms: number, dt: number): void;
	onUpdate(ms: number, dt: number): void;
	onPostUpdate(ms: number, dt: number): void;
	onPreDraw(ms: number, dt: number): void;
	onDraw(ms: number, dt: number): void;
	onPostDraw(ms: number, dt: number): void;
	onDestroy(): void;
};