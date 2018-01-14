import { Matrix3 } from '../matrix';
import { Vec2 } from '../vector';
import { SceneNode } from './g.scene-node';

export abstract class Camera2D extends SceneNode {
	public scale: Vec2 = new Vec2();
	public anchor: Vec2 = new Vec2();
	public position: Vec2 = new Vec2();
	public angle: number;
	public viewport: Vec2 = new Vec2();

	constructor(descriptor?: {
		x: number,
		y: number,
		scaleX: number,
		scaleY: number,
		anchorX: number,
		anchorY: number,
		angle: number,
		viewportX: number,
		viewportY: number,
	}) {
		super();
		this.angle = descriptor ? descriptor.angle || 0 : 0;
		this.scale.x = descriptor ? descriptor.scaleX || 1 : 1;
		this.scale.y = descriptor ? descriptor.scaleY || 1 : 1;
		this.anchor.x = descriptor ? descriptor.anchorX || 0 : 0;
		this.anchor.y = descriptor ? descriptor.anchorY || 0 : 0;
		this.position.x = descriptor ? descriptor.x || 0 : 0;
		this.position.y = descriptor ? descriptor.y || 0 : 0;
		this.viewport.x = descriptor ? descriptor.viewportX : 0;
		this.viewport.y = descriptor ? descriptor.viewportY : 0;
	}

	public getMatrix(): Matrix3 {
		return new Matrix3()
			.translate(this.anchor.x * this.viewport.x, this.anchor.y * this.viewport.y)
			.rotate(-this.angle)
			.scale(1 / this.scale.x, 1 / this.scale.y)
			.translate(-this.position.x, -this.position.y);
	}
}
