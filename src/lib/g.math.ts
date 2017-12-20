import { utils } from './';

export namespace math {
	export const TAU: number = Math.PI * 2;
	export const HALF_PI: number = Math.PI / 2;
	export const QUARTER_PI: number = Math.PI / 4;

	export function clamp(value: number, min: number, max: number): number {
		return Math.min(Math.max(min, value), max);
	}

	export function clamp01(x: number): number {
		return math.clamp(x, 0, 1);
	}

	export function lerp(min: number, max: number, percentage: number): number {
		return min + (max - min) * math.clamp01(percentage);
	}

	export function inRange(value: number, min: number, max: number): boolean {
		return (value > Math.min(min, max) && value < Math.max(min, max));
	}

	export function average(...args: number[]): number {
		const array: number[] = utils.arrayFlatten(args);
		return array.reduce((total: number, value: number) => total + value) / array.length;
	}

	export function rangesIntersect(minA: number, maxA: number, minB: number, maxB: number): boolean {
		return Math.max(minA, maxA) >= Math.min(minB, maxB) && Math.min(minA, maxA) <= Math.max(minB, maxB);
	}

	export function wrap(value: number, min: number, max: number): number {
		return (((value - Math.min(max, min)) % Math.abs(max - min)) + Math.abs(max - min))
			% Math.abs(max - min) + Math.min(max, min);
	}

	function map(value: number, minA: number, maxA: number, minB: number, maxB: number): number {
		return minB + ((value - minA) / (maxA - minA)) * (maxB - minB);
	}

	export function randomRange(min: number, max: number): number {
		const trueMin = Math.min(min, max);
		return trueMin + Math.random() * (Math.max(min, max) - trueMin);
	}

	export function choose(...args: any[]): any {
		return utils.arraySample(utils.arrayFlatten(args));
	}

	export function precision(value: number, decimals: number): number {
		return Number(value.toFixed(decimals));
	}

	export function radians(deg: number): number {
		return deg * Math.PI / 180;
	}

	export function degrees(rad: number): number {
		return rad * 180 / Math.PI;
	}

	export function approximately(a: number, b: number, difference: number = Number.EPSILON): boolean {
		return Math.abs(a - b) < difference;
	}
}

Object.freeze(math);
