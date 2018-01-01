import { SceneNode } from './g.scene-node';
import { IScene } from './g.scene.interface';

export class Scene implements IScene {
	public name: string;
	public collection: SceneNode[];
	private startDirty: boolean = false;

	public onStart(): void {
		this.startDirty = true;
		this.callEvent('onStart', this.collection);
	}

	public onPreUpdate(ms: number, dt: number): void {
		this.callEvent('onPreUpdate', this.collection);
	}

	public onUpdate(ms: number, dt: number): void {
		this.callEvent('onUpdate', this.collection);
	}

	public onPostUpdate(ms: number, dt: number): void {
		this.callEvent('onPostUpdate', this.collection);
	}

	public onPreDraw(ms: number, dt: number): void {
		this.callEvent('onPreDraw', this.collection);
	}

	public onDraw(ms: number, dt: number): void {
		this.callEvent('onDraw', this.collection);
	}

	public onPostDraw(ms: number, dt: number): void {
		this.callEvent('onPostDraw', this.collection);
	}

	public onDestroy(): void {
		this.callEvent('onDestroy', this.collection);
	}

	public set(scene: { name: string, collection: SceneNode[] }) {
		this.name = String(scene.name || '');
		this.collection = scene.collection || [];
		return this;
	}

	private callEvent(event: string, collection: any[]): void {
		(collection || []).forEach((node) => {
			if (node[event] && typeof node[event] === 'function') {
				node[event]();
			}

			if (node.children && Array.isArray(node.children)) {
				this.callEvent(event, node.children);
			}
		});
	}

}
