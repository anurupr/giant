import { Camera2D } from './g.camera-2d';
import { SceneNode } from './g.scene-node';
import { IScene } from './g.scene.interface';

export class Scene implements IScene {
	public name: string;
	public collection: SceneNode[];
	private camera: Camera2D;
	private startDirty: boolean = false;
	private destroyDirty: boolean = false;

	public onStart(): void {
		this.startDirty = true;
		this.callEvent('onStart', this.collection, 0, 0, true);
	}

	public onPreUpdate(ms: number, dt: number): void {
		this.callEvent('onPreUpdate', this.collection, ms, dt, true);
	}

	public onUpdate(ms: number, dt: number): void {
		this.callEvent('onUpdate', this.collection, ms, dt, true);
	}

	public onPostUpdate(ms: number, dt: number): void {
		this.callEvent('onPostUpdate', this.collection, ms, dt, true);
	}

	public onPreDraw(ms: number, dt: number): void {
		this.callEvent('onPreDraw', this.collection, ms, dt, true);
	}

	public onDraw(ms: number, dt: number): void {
		this.callEvent('onDraw', this.collection, ms, dt, true);
	}

	public onPostDraw(ms: number, dt: number): void {
		this.callEvent('onPostDraw', this.collection, ms, dt, true);
	}

	public onDestroy(): void {
		this.callEvent('onDestroy', this.collection, 0, 0, true);
	}

	public set(scene: { name: string, collection: SceneNode[], camera: Camera2D }) {
		this.name = String(scene.name || '');
		this.setCollection(scene.collection);
		this.setCamera(scene.camera);
		return this;
	}

	public add(node: SceneNode) {
		if (this.startDirty && node.onStart) {
			node.onStart();
		}

		this.collection.push(node);
	}

	public remove(node: SceneNode) {
		if (this.startDirty && node.onDestroy) {
			node.onDestroy();
		}

		this.collection.splice(this.collection.findIndex((el) => el.equals(node)), 1);
	}

	public setCollection(collection: SceneNode[] = []) {
		if (this.collection && this.destroyDirty) {
			this.collection.forEach((node) => {
				if (node.onDestroy) {
					node.onDestroy();
				}
			});
		}

		if (this.startDirty) {
			collection.forEach((node) => {
				if (node.onStart) {
					node.onStart();
				}
			});
		}

		this.collection = collection;
	}

	public setCamera(camera: Camera2D) {
		if (this.destroyDirty && this.camera && this.camera.onDestroy) {
			this.camera.onDestroy();
		}

		if (this.startDirty && camera.onStart) {
			camera.onStart();
		}

		this.camera = camera;
	}

	public getCamera(): Camera2D {
		return this.camera;
	}

	private callEvent(event: string, collection: SceneNode[], ms: number, dt: number, triggerCamera: boolean): void {
		if (triggerCamera) {
			this.triggerEvent(event, this.camera, ms, dt);
		}

		(collection || []).forEach((node) => {
			this.triggerEvent(event, node, ms, dt);

			if (node.children && Array.isArray(node.children)) {
				this.callEvent(event, node.children, ms, dt, false);
			}
		});
	}

	private triggerEvent(event: string, node: SceneNode, ms: number, dt: number) {
		switch (event) {
			case 'onStart':
				if (node.onStart) {
					node.onStart();
				}
				break;
			case 'onPreUpdate':
				if (node.onPreUpdate) {
					node.onPreUpdate(ms, dt);
				}
				break;
			case 'onUpdate':
				if (node.onUpdate) {
					node.onUpdate(ms, dt);
				}
				break;
			case 'onPostUpdate':
				if (node.onPostUpdate) {
					node.onPostUpdate(ms, dt);
				}
				break;
			case 'onPreDraw':
				if (node.onPreDraw) {
					node.onPreDraw(ms, dt);
				}
				break;
			case 'onDraw':
				if (node.onDraw) {
					node.onDraw(ms, dt);
				}
				break;
			case 'onDestroy':
				if (node.onDestroy) {
					node.onDestroy();
				}
				break;
		}
	}

}
