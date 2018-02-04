import { TreeNode } from '../common';
import { Renderer2D } from '../graphics';
import { Camera2D } from './g.camera-2d';
import { SceneNode } from './g.scene-node';

export class Scene extends TreeNode {
	public name: string;
	public renderer: Renderer2D;
	public readonly cameras: Camera2D[] = [];

	private startDirty: boolean = false;
	private destroyDirty: boolean = false;

	public onStart(): void {
		this.startDirty = true;
		this.callEvent('onStart', 0, 0);
	}

	public update(ms: number, dt: number): void {
		this.callEvent('onPreUpdate', ms, dt);
		this.callEvent('onUpdate', ms, dt);
		this.callEvent('onPostUpdate', ms, dt);
	}

	public draw(ms: number, dt: number): void {
		this.renderer.clear();
		this.cameras.forEach((camera) => {
			this.renderer.save();
			this.renderer.transform(camera.getMatrix());
			this.callEvent('onPreDraw', ms, dt);
			this.callEvent('onDraw', ms, dt);
			this.callEvent('onPostDraw', ms, dt);
			this.renderer.restore();
		});
	}

	public onDestroy(): void {
		this.destroyDirty = true;
		this.callEvent('onDestroy', 0, 0);
	}

	public set(scene: { name: string, children: TreeNode[] }): this {
		this.name = String(scene.name || '');
		this.setChildren(scene.children);
		return this;
	}

	public setChildren(children: TreeNode[]): this {
		super
		.setChildren(children)
		.iterateChildren((node) => {
			if (node instanceof Camera2D) {
				this.cameras.push(node);
			}
		});

		return this;
	}

	public addChild(node: SceneNode): this {
		super.addChild(node);

		if (this.startDirty && node.onStart) {
			node.onStart();
		}

		return this;
	}

	public removeChild(node: SceneNode, deep: boolean): this {
		super.removeChild(node, deep);

		if (!this.destroyDirty && node.onDestroy) {
			node.onDestroy();
		}

		return this;
	}

	public setRenderer(renderer: Renderer2D) {
		this.renderer = renderer;
		this.iterateChildren((node) => {
			(node as SceneNode).setRenderer(renderer);
		});
	}

	private callEvent(event: string, ms: number, dt: number): void {
		(this.children || []).forEach((node) => {
			this.triggerEvent(event, node as SceneNode, ms, dt);
			node.iterateChildren((child) => this.triggerEvent(event, child as SceneNode, ms, dt));
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
			case 'onPostDraw':
				if (node.onPostDraw) {
					node.onPostDraw(ms, dt);
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
