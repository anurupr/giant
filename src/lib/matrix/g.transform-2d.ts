import { Vec2 } from '../vector';
import { Matrix3 } from './g.matrix3';

export class Transform2D {
	public scale: Vec2 = new Vec2();
	public anchor: Vec2 = new Vec2();
	public position: Vec2 = new Vec2();
	public angle: number;

	constructor(descriptor?: {
		x: number,
		y: number,
		scaleX: number,
		scaleY: number,
		anchorX: number,
		anchorY: number,
		angle: number,
	}) {
		this.angle = descriptor ? descriptor.angle || 0 : 0;
		this.scale.x = descriptor ? descriptor.scaleX || 1 : 1;
		this.scale.y = descriptor ? descriptor.scaleY || 1 : 1;
		this.anchor.x = descriptor ? descriptor.anchorX || 0 : 0;
		this.anchor.y = descriptor ? descriptor.anchorY || 0 : 0;
		this.position.x = descriptor ? descriptor.x || 0 : 0;
		this.position.y = descriptor ? descriptor.y || 0 : 0;
	}

	public getMatrix(): Matrix3 {
		return new Matrix3()
			.translate(this.position.x, this.position.y)
			.rotate(this.angle)
			.scale(this.scale.x, this.scale.y)
			.translate(-this.anchor.x, -this.anchor.y);
	}

}
