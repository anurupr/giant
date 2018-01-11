import { Matrix3, Transform2D } from '../matrix';
import { Vec2 } from '../vector';
import { SceneNode } from './g.scene-node';

export abstract class Camera2D extends SceneNode {
	public transform: Transform2D;
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
		this.transform = new Transform2D(descriptor);
		this.viewport.x = descriptor ? descriptor.viewportX : 0;
		this.viewport.y = descriptor ? descriptor.viewportY : 0;
	}

	public getMatrix(): Matrix3 {
		return new Matrix3()
			.translate(this.transform.anchor.x * this.viewport.x, this.transform.anchor.y * this.viewport.y)
			.rotate(-this.transform.angle)
			.scale(1 / this.transform.scale.x, 1 / this.transform.scale.y)
			.translate(-this.transform.position.x, -this.transform.position.y);
	}
}
