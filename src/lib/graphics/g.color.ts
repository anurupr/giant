import { math } from '../g.math';

interface IColor {
	r: number;
	g: number;
	b: number;
	a: number;
}

export class Color {
	public static destructure(r: number, g?: number, b?: number, a?: number): IColor;
	public static destructure(arg: Color | IColor): IColor;

	public static destructure(arg: any, g: number = 0, b: number = 0, a: number = 1): IColor {
		let rval = 0;
		let gval = 0;
		let bval = 0;
		let aval = 1;

		if (arg && arg instanceof Color || typeof arg === 'object') {
			rval = arg.r;
			gval = arg.g;
			bval = arg.b;
			aval = arg.a || aval;
		} else {
			rval = arg;
			gval = g;
			bval = b;
			aval = a || aval;
		}

		return { r: rval, g: gval, b: bval, a: aval };
	}

	// public static fromHSLA(h: number = 0, s: number = h, l: number = h, a: number = 1): Color {

	// }

	// public static fromHEX(color: string): Color {

	// }

	// public static parse(color: string): Color {

	// }

	public rgb: Uint8Array = new Uint8Array(3);
	public a: number = 1.0;

	constructor(r: number, g?: number, b?: number, a?: number);
	constructor(arg: Color | IColor);

	constructor(arg: any, gval: number = arg, bval: number = arg, aval: number = 1) {
		const { r, g, b, a } = Color.destructure(arg, gval, bval, aval);

		this.rgb[0] = r;
		this.rgb[1] = g;
		this.rgb[2] = b;

		this.a = a;
	}

	public get r(): number {
		return this.rgb[0];
	}

	public set r(value) {
		this.rgb[0] = value;
	}

	public get g(): number {
		return this.rgb[1];
	}

	public set g(value) {
		this.rgb[1] = value;
	}

	public get b(): number {
		return this.rgb[2];
	}

	public set b(value) {
		this.rgb[2] = value;
	}

	public get toGreyscale(): Color {
		let luminosity = (this.rgb[0] * 0.3) + (this.rgb[1] * 0.59) + (this.rgb[2] * 0.11);
		luminosity = math.clamp(Math.floor(luminosity), 0, 255);

		return new Color(luminosity, luminosity, luminosity, this.a);
	}

	public get toHex(): string {
		return '#';
	}

	public get toHSLA(): string {
		return 'hsl()';
	}

	public toString(): string {
		if (this.a < 1) {
			return `rgba(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]}, ${this.a})`;
		} else {
			return `rgb(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]})`;
		}
	}

	public lighten(percentage: number) {
		const p = math.clamp01(percentage);

		this.rgb[0] = math.lerp(this.rgb[0], 255, p);
		this.rgb[1] = math.lerp(this.rgb[1], 255, p);
		this.rgb[2] = math.lerp(this.rgb[2], 255, p);

		return this;
	}

	public darken(percentage: number) {
		const p = math.clamp01(percentage);

		this.rgb[0] = math.lerp(this.rgb[0], 0, p);
		this.rgb[1] = math.lerp(this.rgb[1], 0, p);
		this.rgb[2] = math.lerp(this.rgb[2], 0, p);

		return this;
	}

	public add(r: number, g?: number, b?: number): Color;
	public add(color?: Color): Color;

	public add(arg: any, gval: number = 0, bval: number = 0) {
		const { r, g, b } = Color.destructure(arg, gval, bval);

		this.rgb[0] += r;
		this.rgb[1] += g;
		this.rgb[2] += b;

		return this;
	}

	public subtract(r: number, g?: number, b?: number): Color;
	public subtract(color?: Color): Color;

	public subtract(arg: any, gval: number = 0, bval: number = 0) {
		const { r, g, b } = Color.destructure(arg, gval, bval);

		this.rgb[0] -= r;
		this.rgb[1] -= g;
		this.rgb[2] -= b;

		return this;
	}
}
