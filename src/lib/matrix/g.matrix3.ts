export class Matrix3 {
	public static readonly identity = new Matrix3().freeze();
	public static readonly zero = new Matrix3(0, 0, 0, 0, 0, 0, 0, 0, 0).freeze();

	public static multiply(m: Matrix3, n: Matrix3, output?: Matrix3): Matrix3 {
		const out = output || new Matrix3();
		const a = m.data;
		const b = n.data;

		out.set(
			a[0] * b[0] + a[1] * b[3] + a[2] * b[6],
			a[0] * b[1] + a[1] * b[4] + a[2] * b[7],
			a[0] * b[2] + a[1] * b[5] + a[2] * b[8],

			a[3] * b[0] + a[4] * b[3] + a[5] * b[6],
			a[3] * b[1] + a[4] * b[4] + a[5] * b[7],
			a[3] * b[2] + a[4] * b[5] + a[5] * b[8],

			a[6] * b[0] + a[7] * b[3] + a[8] * b[6],
			a[6] * b[1] + a[7] * b[4] + a[8] * b[7],
			a[6] * b[2] + a[7] * b[5] + a[8] * b[8],
		);

		return out;
	}

	public static add(m: Matrix3, n: Matrix3, output?: Matrix3): Matrix3 {
		const out = output || new Matrix3();
		const a = m.data;
		const b = n.data;

		out.set(
			a[0] + b[0],
			a[1] + b[1],
			a[2] + b[2],
			a[3] + b[3],
			a[4] + b[4],
			a[5] + b[5],
			a[6] + b[6],
			a[7] + b[7],
			a[8] + b[8],
		);

		return out;
	}

	public static multiplyScalar(m: Matrix3, scalar: number = 0, output?: Matrix3): Matrix3 {
		const out = output || new Matrix3();
		const a = m.data;

		out.set(
			a[0] * scalar,
			a[1] * scalar,
			a[2] * scalar,
			a[3] * scalar,
			a[4] * scalar,
			a[5] * scalar,
			a[6] * scalar,
			a[7] * scalar,
			a[8] * scalar,
		);

		return out;
	}

	public static equals(m: Matrix3, n: Matrix3): boolean {
		const a = m.data;
		const b = m.data;
		let areEqual = true;
		for (let i = 0; i < 9; i++) {
			areEqual = areEqual && a[i] === b[i];
		}

		return areEqual;
	}

	public static clone(m: Matrix3): Matrix3 {
		return new Matrix3().set(m);
	}

	public static translate(m: Matrix3, x: number, y: number, output?: Matrix3): Matrix3 {
		const out = output || new Matrix3();
		const a = m.data;

		out.set(
			a[0],
			a[1],
			a[0] * x + a[1] * y + a[2],
			a[3],
			a[4],
			a[3] * x + a[4] * y + a[5],
			a[6],
			a[7],
			a[8],
		);

		return out;
	}

	public static scale(m: Matrix3, x: number, y: number, output?: Matrix3): Matrix3 {
		const out = output || new Matrix3();
		const a = m.data;

		out.set(
			a[0] * x,
			a[1] * y,
			a[2],
			a[3] * x,
			a[4] * y,
			a[5],
			a[6],
			a[7],
			a[8],
		);

		return out;
	}

	public static rotate(m: Matrix3, angle: number, output?: Matrix3): Matrix3 {
		const out = output || new Matrix3();
		const a = m.data;
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);

		out.set(
			a[0] * cos + a[1] * -sin,
			a[0] * sin + a[1] * cos,
			a[2],

			a[3] * cos + a[4] * -sin,
			a[3] * sin + a[4] * cos,
			a[5],

			a[6],
			a[7],
			a[8],
		);

		return out;
	}

	public static determinant(m: Matrix3): number {
		const a = m.data;
		return (
			a[0] * a[4] * a[8] +
			a[1] * a[5] * a[6] +
			a[2] * a[3] * a[7]
		) - (
			a[6] * a[4] * a[2] +
			a[7] * a[5] * a[0] +
			a[8] * a[3] * a[1]
		);
	}

	public static inverse(m: Matrix3, output?: Matrix3): Matrix3 {
		const out = output || new Matrix3();
		const a = m.data;
		let determinant = Matrix3.determinant(out);

		if (determinant === 0) {
			throw new Error('Trying to invert a degenerate matrix.');
		}

		determinant = 1 / determinant;

		out.set(
			(a[4] * a[8] - a[5] * a[7]) * determinant,
			(a[1] * a[8] - a[2] * a[7]) * -determinant,
			(a[1] * a[5] - a[2] * a[4]) * determinant,
			(a[3] * a[8] - a[5] * a[6]) * -determinant,
			(a[0] * a[8] - a[2] * a[6]) * determinant,
			(a[0] * a[5] - a[2] * a[3]) * -determinant,
			(a[3] * a[7] - a[4] * a[6]) * determinant,
			(a[0] * a[7] - a[1] * a[6]) * -determinant,
			(a[0] * a[4] - a[1] * a[3]) * determinant,
		);

		return out;
	}

	public static transpose(m: Matrix3, output?: Matrix3): Matrix3 {
		const out = output || new Matrix3();
		const a = m.data;

		out.set(
			a[0], a[3], a[6],
			a[1], a[4], a[7],
			a[2], a[5], a[8],
		);

		return out;
	}

	public readonly data: number[] = new Array(9).fill(0);

	constructor(
		arg?: number | Matrix3 | Float32Array | number[] |
		{ a?: number, b?: number, c?: number, d?: number, e?: number, f?: number, g?: number, h?: number, i?: number },
		b?: number, c?: number,
		d?: number, e?: number, f?: number,
		g?: number, h?: number, i?: number,
	) {
		this.set(arg, b, c, d, e, f, g, h, i);
	}

	/**  */
	public set(
		arg?: number | Matrix3 | Float32Array | number[] |
		{ a?: number, b?: number, c?: number, d?: number, e?: number, f?: number, g?: number, h?: number, i?: number },
		b?: number, c?: number,
		d?: number, e?: number, f?: number,
		g?: number, h?: number, i?: number,
	): this {
		if (arg === undefined || arg === null || typeof arg === 'number') {
			this.data[0] = arg === undefined ? 1 : arg;
			this.data[1] = b || 0;
			this.data[2] = c || 0;

			this.data[3] = d || 0;
			this.data[4] = e === undefined ? 1 : e;
			this.data[5] = f || 0;

			this.data[6] = g || 0;
			this.data[7] = h || 0;
			this.data[8] = i === undefined ? 1 : i;
		} else if (arg instanceof Matrix3) {
			this.data[0] = arg.data[0] === undefined ? 1 : arg.data[0];
			this.data[1] = arg.data[1] || 0;
			this.data[2] = arg.data[2] || 0;

			this.data[3] = arg.data[3] || 0;
			this.data[4] = arg.data[4] === undefined ? 1 : arg.data[4];
			this.data[5] = arg.data[5] || 0;

			this.data[6] = arg.data[6] || 0;
			this.data[7] = arg.data[7] || 0;
			this.data[8] = arg.data[8] === undefined ? 1 : arg.data[8];
		} else if (arg instanceof Float32Array || Array.isArray(arg)) {
			this.data[0] = arg[0] === undefined ? 1 : arg[0];
			this.data[1] = arg[1] || 0;
			this.data[2] = arg[2] || 0;

			this.data[3] = arg[3] || 0;
			this.data[4] = arg[4] === undefined ? 1 : arg[4];
			this.data[5] = arg[5] || 0;

			this.data[6] = arg[6] || 0;
			this.data[7] = arg[7] || 0;
			this.data[8] = arg[8] === undefined ? 1 : arg[8];
		} else if (typeof arg === 'object') {
			this.data[0] = arg.a === undefined ? 1 : arg.a;
			this.data[1] = arg.b || 0;
			this.data[2] = arg.c || 0;

			this.data[3] = arg.d || 0;
			this.data[4] = arg.e === undefined ? 1 : arg.e;
			this.data[5] = arg.f || 0;

			this.data[6] = arg.g || 0;
			this.data[7] = arg.h || 0;
			this.data[8] = arg.i === undefined ? 1 : arg.i;
		}

		return this;
	}

	public toArray(): number[] {
		return [
			this.data[0],
			this.data[1],
			this.data[2],
			this.data[3],
			this.data[4],
			this.data[5],
			this.data[6],
			this.data[7],
			this.data[8],
		];
	}

	public determinant(): number {
		return Matrix3.determinant(this);
	}

	public equals(n: Matrix3): boolean {
		return Matrix3.equals(this, n);
	}

	public multiply(n: Matrix3): this {
		Matrix3.multiply(this, n, this);
		return this;
	}

	public add(n: Matrix3): this {
		Matrix3.add(this, n, this);
		return this;
	}

	public multiplyScalar(scalar: number): this {
		Matrix3.multiplyScalar(this, scalar, this);
		return this;
	}

	public clone(): Matrix3 {
		return new Matrix3(this);
	}

	public translate(x: number, y: number): this {
		this.data[2] += this.data[0] * x + this.data[1] * y;
		this.data[5] += this.data[3] * x + this.data[4] * y;
		return this;
	}

	public scale(x: number, y: number): this {
		this.data[0] *= x;
		this.data[1] *= y;
		this.data[3] *= x;
		this.data[4] *= y;
		return this;
	}

	public rotate(angle: number): this {
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);
		let temp0 = this.data[0] * cos + this.data[1] * -sin;
		let temp1 = this.data[0] * sin + this.data[1] * cos;
		this.data[0] = temp0;
		this.data[1] = temp1;

		temp0 = this.data[3] * cos + this.data[4] * -sin;
		temp1 = this.data[3] * sin + this.data[4] * cos;
		this.data[3] = temp0;
		this.data[4] = temp1;

		return this;
	}

	public inverse(): this {
		Matrix3.inverse(this, this);
		return this;
	}

	public transpose(): this {
		Matrix3.transpose(this, this);
		return this;
	}

	public freeze(): this {
		Object.freeze(this.data);
		return this;
	}

	public set a(n: number) {
		this.data[0] = n;
	}

	public get a(): number {
		return this.data[0];
	}

	public set b(n: number) {
		this.data[1] = n;
	}

	public get b(): number {
		return this.data[1];
	}

	public set c(n: number) {
		this.data[2] = n;
	}

	public get c(): number {
		return this.data[2];
	}

	public set d(n: number) {
		this.data[3] = n;
	}

	public get d(): number {
		return this.data[3];
	}

	public set e(n: number) {
		this.data[4] = n;
	}

	public get e(): number {
		return this.data[4];
	}

	public set f(n: number) {
		this.data[5] = n;
	}

	public get f(): number {
		return this.data[5];
	}

	public set g(n: number) {
		this.data[6] = n;
	}

	public get g(): number {
		return this.data[6];
	}

	public set h(n: number) {
		this.data[7] = n;
	}

	public get h(): number {
		return this.data[7];
	}

	public set i(n: number) {
		this.data[8] = n;
	}

	public get i(): number {
		return this.data[8];
	}

}
