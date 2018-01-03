export class Transform2D {
	/**
	 * 2D Transform based on the matrix:
	 * ( width * cos(A), 	height * sin(A),  a * anchorX + c * anchorY + x )
	 * ( width * -sin(A), height * cos(A), 	b * anchorX + d * anchorY + y )
	 * ( 0, 							0, 								1 														)
	 *
	 * Which is the result of multiplying the transformation matrices: translate * rotate * scale * translate anchor
	 */

	public width: number;
	public height: number;
	public angle: number;
	public anchorX: number;
	public anchorY: number;
	public x: number;
	public y: number;

	constructor(descriptor: {
		x: number,
		y: number,
		width: number,
		height: number,
		anchorX: number,
		anchorY: number,
		angle: number,
	}) {
		this.angle = descriptor.angle || 0;
		this.width = descriptor.width || 0;
		this.height = descriptor.height || 0;
		this.anchorX = descriptor.anchorX || 0;
		this.anchorY = descriptor.anchorY || 0;
		this.x = descriptor.x || 0;
		this.y = descriptor.y || 0;
	}

	public get a() {
		return this.width * Math.cos(this.angle);
	}

	public get b() {
		return this.width * -Math.sin(this.angle);
	}

	public get c() {
		return this.height * Math.sin(this.angle);
	}

	public get d() {
		return this.height * Math.cos(this.angle);
	}

	public get e() {
		return (this.width * Math.cos(this.angle)) * -this.anchorX +
		(this.height * Math.sin(this.angle)) * -this.anchorY + this.x;
	}

	public get f() {
		return (this.width * -Math.sin(this.angle)) * -this.anchorX +
		(this.height * Math.cos(this.angle)) * -this.anchorY + this.y;
	}

}
