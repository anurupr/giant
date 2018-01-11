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

	export function approximately(a: number, b: number, difference: number = Number.EPSILON): boolean {
		const d = digits(difference);
		const fixedA = precision(a, d);
		const fixedB = precision(b, d);
		const val = Math.abs(fixedA - fixedB);
		return val <= difference;
	}
}

Object.freeze(math);
