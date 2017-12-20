import { math, utils } from '../';

export class Vec2 {
	/* Static constants */

	public static readonly zero: Vec2 = new Vec2(0, 0);
	public static readonly up: Vec2 = new Vec2(0, -1);
	public static readonly down: Vec2 = new Vec2(0, 1);
	public static readonly right: Vec2 = new Vec2(1, 0);
	public static readonly left: Vec2 = new Vec2(-1, 0);
	public static readonly rightUp: Vec2 = new Vec2((0.70710678118654752), -(0.70710678118654752));
	public static readonly leftUp: Vec2 = new Vec2(-(0.70710678118654752), -(0.70710678118654752));
	public static readonly leftDown: Vec2 = new Vec2(-(0.70710678118654752), (0.70710678118654752));
	public static readonly rightDown: Vec2 = new Vec2((0.70710678118654752), (0.70710678118654752));

	/* Static methods */

	public static destructure(x: any, y: number): { xval: number, yval: number } {
		const xIsVector = (typeof(x) === 'object' || y === undefined);
		return { xval: xIsVector ? x.x : x, yval: xIsVector ? x.y : y };
	}

	public static clone(...args: Vec2[]): Vec2[] | Vec2 {
		const vectorList = utils.arrayFlatten(args).map((vector: Vec2) => new Vec2(vector.x, vector.y));
		return vectorList.length > 1 ? vectorList : vectorList[0];
	}

	public static operate(args: Vec2[], method: (prev: number, value: number) => number): Vec2 {
		const vectors = utils.arrayFlatten(args);
		let x = 0.0;
		let y = 0.0;

		for (const vector of vectors) {
			if (!isNaN(vector.x) && !isNaN(vector.y)) {
				x = method(x, vector.x);
				y = method(y, vector.y);
			} else {
				throw Error('Invalid value at set Vec2 operation');
			}
		}

		return new Vec2(x, y);
	}

	public static add(...args: Vec2[]): Vec2 {
		return Vec2.operate(args, (prev: number, value: number) => prev + value);
	}

	public static distance(vec1: Vec2, vec2: Vec2): number {
		return Math.sqrt((vec1.x - vec2.x) * (vec1.x - vec2.x) + (vec1.y - vec2.y) * (vec1.y - vec2.y));
	}

	public static dot(vec1: Vec2, vec2: Vec2): number {
		return (vec1.x * vec2.x) + (vec1.y * vec2.y);
	}

	public static angle(vec1: Vec2, vec2: Vec2): number {
		return Math.acos(Vec2.dot(vec1, vec2) / (vec1.magnitude * vec2.magnitude));
	}

	public static lerp(vec1: Vec2, vec2: Vec2, percentage: number): Vec2 {
		return new Vec2(math.lerp(vec1.x, vec2.x, percentage), math.lerp(vec1.y, vec2.y, percentage));
	}

	/* Instance properties */

	public x: number = 0.0;
	public y: number = 0.0;

	/* Instance methods */

	constructor(x: number = 0.0, y: number = 0.0) {
		this.x = x;
		this.y = y;
	}

	public get squaredMagnitude(): number {
		return (this.x * this.x) + (this.y * this.y);
	}

	public get magnitude(): number {
		return Math.sqrt(this.squaredMagnitude);
	}

	public get angle(): number {
		return Math.atan(this.y / this.x);
	}

	public get normalized(): Vec2 {
		const magnitude = this.magnitude;
		return new Vec2(this.x / magnitude, this.y / magnitude);
	}

	public toString(): string {
		return `(${this.x}, ${this.y})`;
	}

	public clone(): Vec2 {
		return new Vec2(this.x, this.y);
	}

	public toArray(): number[] {
		return [this.x, this.y];
	}

	public set(x: number = 0.0, y: number = 0.0): this {
		this.x = x;
		this.y = y;

		return this;
	}

	public normalize(): this {
		const magnitude = this.magnitude;

		this.x /= magnitude;
		this.y /= magnitude;

		return this;
	}

	public operate(x: number | Vec2, y: number, method: (prev: number, value: number) => number): this {
		const { xval, yval } = Vec2.destructure(x, y);

		if (!isNaN(xval) && !isNaN(yval)) {
			this.x = method(this.x, xval);
			this.y = method(this.y, yval);
		} else {
			throw Error('Invalid value at Vec2 operation');
		}

		return this;
	}

	public add(x: any, y: number = x): this {
		return this.operate(x, y, (prev: number, value: number) => prev + value);
	}

	public subtract(x: any, y: number = x): this {
		return this.operate(x, y, (prev: number, value: number) => prev - value);
	}

	public scale(x: any, y: number = x): this {
		return this.operate(x, y, (prev: number, value: number) => prev * value);
	}

	public divide(x: any, y: number = x): this {
		return this.operate(x, y, (prev: number, value: number) => prev / value);
	}

	public equals(x: number | Vec2, y: number): boolean {
		const { xval, yval } = Vec2.destructure(x, y);

		if (!isNaN(xval) && !isNaN(yval)) {
			return this.x === xval && this.y === yval;
		} else {
			throw Error('Invalid value at Vec2 comparison');
		}
	}

	public setMagnitude(magnitude: number): this {
		this.normalize();
		this.scale(magnitude);

		return this;
	}

	public rotate(angle: number): this {
		this.x = (this.x * Math.cos(angle)) - (this.y * Math.sin(angle));
		this.y = (this.x * Math.sin(angle)) + (this.y * Math.cos(angle));

		return this;
	}
}
