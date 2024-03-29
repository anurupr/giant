import { utils } from './g.utils';

export namespace math {
	export const TAU: number = Math.PI * 2;
	export const HALF_PI: number = Math.PI / 2;
	export const QUARTER_PI: number = Math.PI / 4;

	export function clamp(value: number, min: number, max: number): number {
		const trueMin = Math.min(min, max);
		const trueMax = Math.max(min, max);
		return Math.min(Math.max(trueMin, value), trueMax);
	}

	export function clamp01(x: number): number {
		return math.clamp(x, 0, 1);
	}

	export function lerp(min: number, max: number, percentage: number): number {
		return min + (max - min) * math.clamp01(percentage);
	}

	export function inRange(value: number, min: number, max: number): boolean {
		const trueMin = Math.min(min, max);
		const trueMax = Math.max(min, max);
		return (value > Math.min(trueMin, trueMax) && value < Math.max(trueMin, trueMax));
	}

	export function average(arr: number[]): number;
	export function average(...args: number[]): number;

	export function average(...args: any[]): number {
		const array: number[] = utils.arrayFlatten(args);
		return array.reduce((total: number, value: number) => total + value) / array.length;
	}

	export function rangesIntersect(minA: number, maxA: number, minB: number, maxB: number): boolean {
		const trueMinA = Math.min(minA, maxA);
		const trueMaxA = Math.max(minA, maxA);
		const trueMinB = Math.min(minB, maxB);
		const trueMaxB = Math.max(minB, maxB);
		return Math.max(trueMinA, trueMaxA)
			>= Math.min(trueMinB, trueMaxB)
			&& Math.min(trueMinA, trueMaxA)
			<= Math.max(trueMinB, trueMaxB);
	}

	export function wrap(value: number, min: number, max: number): number {
		const trueMin = Math.min(min, max);
		const trueMax = Math.max(min, max);
		return (((value - Math.min(trueMax, trueMin)) % Math.abs(trueMax - trueMin)) + Math.abs(trueMax - trueMin))
			% Math.abs(trueMax - trueMin) + Math.min(trueMax, trueMin);
	}

	export function map(value: number, minA: number, maxA: number, minB: number, maxB: number): number {
		return minB + ((value - minA) / (maxA - minA)) * (maxB - minB);
	}

	export function randomRange(min: number, max: number): number {
		const trueMin = Math.min(min, max);
		const trueMax = Math.max(min, max);
		return trueMin + Math.random() * (Math.max(trueMin, trueMax) - trueMin);
	}

	export function choose(...args: any[]): any {
		return utils.arraySample(utils.arrayFlatten(args));
	}

	export function precision(value: number, decimals: number): number {
		return Number(value.toFixed(decimals));
	}

	export function digits(num: number): number {
		return num.toString().replace(/[^\d]/g, '').length;
	}

	export function radians(deg: number): number {
		return ((deg * Math.PI / 180) + math.TAU) % math.TAU;
	}

	export function degrees(rad: number): number {
		return ((rad * 180 / Math.PI) + 360) % 360;
	}

	export function approximately(a: number, b: number, difference: number = 0): boolean {
		return math.inRange(Math.abs(a - b), difference - 0.000000000001, difference + 0.000000000001);
	}

	export interface IRectangle {
		x: number;
		y: number;
		width: number;
		height: number;
	}

	export interface ICircle {
		x: number;
		y: number;
		radius: number;
	}

	export interface IPoint {
		x: number;
		y: number;
	}

	export function checkRectanglePointCollision(a: IRectangle, b: IPoint): boolean {
		return a.x < b.x && a.x + Math.abs(a.width) > b.x && a.y < b.y && a.y + Math.abs(a.height) > b.y;
	}

	export function checkCirclePointCollision(a: ICircle, b: IPoint): boolean {
		return Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) <= Math.pow(a.radius, 2);
	}

	export function checkRectangleCollision(a: IRectangle, b: IRectangle): boolean {
		return math.rangesIntersect(a.x, a.x + a.width, b.x, b.x + b.width) &&
			math.rangesIntersect(a.y, a.y + a.height, b.y + b.height, b.y + b.height);
	}

	export function checkCircleCollision(a: ICircle, b: ICircle): boolean {
		return Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) <= Math.pow(a.radius + b.radius, 2);
	}
}

Object.freeze(math);
