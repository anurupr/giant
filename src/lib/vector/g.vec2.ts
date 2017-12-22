import { math, utils } from '../';

interface IVec2 {
	x: number;
	y: number;
}

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

	public static destructure(x: number, y?: number): IVec2;
	public static destructure(arg: Vec2 | IVec2): IVec2;

	public static destructure(arg: any, y?: number): IVec2 {
		let xval = 0.0;
		let yval = 0.0;

		if (arg && arg instanceof Vec2 || typeof arg === 'object') {
			xval = arg.x;
			yval = arg.y;
		} else {
			xval = arg ? arg : 0.0;
			yval = y ? y : 0.0;
		}

		return { x: xval, y: yval };
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

	constructor(x?: number, y?: number);
	constructor(obj?: Vec2 | IVec2);

	constructor(arg?: any, yval?: number) {
		const { x, y } = Vec2.destructure(arg, yval);

		this.x = x;
		this.y = y;
	}

	public get squaredMagnitude(): number {
		return Math.abs((this.x * this.x) + (this.y * this.y));
	}

	public get magnitude(): number {
		return Math.sqrt(this.squaredMagnitude);
	}

	public get angle(): number {
		return (Math.atan2(this.y, this.x) + math.TAU) % math.TAU;
	}

	public get normalized(): Vec2 {
		const magnitude = this.magnitude;
		return new Vec2(this.x / magnitude, this.y / magnitude);
	}

	public toString(): string {
		return `(${this.x}, ${this.y})`;
	}

	public clone(): Vec2 {
		return new Vec2(this);
	}

	public toArray(): number[] {
		return [this.x, this.y];
	}

	public set(x?: number, y?: number): Vec2;
	public set(obj?: Vec2 | IVec2): Vec2;

	public set(arg?: any, yval?: number) {
		const { x, y } = Vec2.destructure(arg, yval);

		this.x = x;
		this.y = y;

		return this;
	}

	public normalize() {
		const magnitude = this.magnitude;

		this.x /= magnitude;
		this.y /= magnitude;

		return this;
	}

	public operate(x: number, y: number, method: (prev: number, value: number) => number) {
		if (!isNaN(x) && !isNaN(y)) {
			this.x = method(this.x, x);
			this.y = method(this.y, y);
		} else {
			throw Error('Invalid value at Vec2 operation');
		}

		return this;
	}

	public add(x: number, y?: number): Vec2;
	public add(obj: Vec2 | IVec2): Vec2;

	public add(arg: any, yval?: number) {
		const { x, y } = Vec2.destructure(arg, yval);
		return this.operate(x, y, (prev: number, value: number) => prev + value);
	}

	public subtract(x: number, y?: number): Vec2;
	public subtract(obj: Vec2 | IVec2): Vec2;

	public subtract(arg: any, yval?: number) {
		const { x, y } = Vec2.destructure(arg, yval);
		return this.operate(x, y, (prev: number, value: number) => prev - value);
	}

	public scale(x: number, y?: number): Vec2;
	public scale(obj: Vec2 | IVec2): Vec2;

	public scale(arg: any, yval?: number) {
		const { x, y } = Vec2.destructure(arg, yval);
		return this.operate(x, y, (prev: number, value: number) => prev * value);
	}

	public divide(x: number, y?: number): Vec2;
	public divide(obj: Vec2 | IVec2): Vec2;

	public divide(arg: any, yval?: number) {
		const { x, y } = Vec2.destructure(arg, yval);
		return this.operate(x, y, (prev: number, value: number) => prev / value);
	}

	public equals(x: number, y?: number): boolean;
	public equals(obj: Vec2 | IVec2): boolean;

	public equals(arg: any, yval?: number): boolean {
		const { x, y } = Vec2.destructure(arg, yval);

		if (!isNaN(x) && !isNaN(y)) {
			return this.x === x && this.y === y;
		} else {
			throw Error('Invalid value at Vec2 comparison');
		}
	}

	public setMagnitude(magnitude: number) {
		this.normalize();
		this.scale(magnitude);

		return this;
	}

	public rotate(angle: number) {
		this.x = (this.x * Math.cos(angle)) - (this.y * Math.sin(angle));
		this.y = (this.x * Math.sin(angle)) + (this.y * Math.cos(angle));

		return this;
	}
}
