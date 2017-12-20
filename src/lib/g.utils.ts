export namespace utils {
	export function arrayMax(array: number[]): number {
		return Math.max(...array);
	}

	export function arrayMin(array: number[]): number {
		return Math.min(...array);
	}

	export function arrayFlatten(array: any[]): any[] {
		return [].concat(...array.map((a: any) => Array.isArray(a) ? utils.arrayFlatten(a) : a));
	}

	export function arrayDifference(a: any[], b: any[]): any[] {
		const set = new Set(b);
		return a.filter((x: any) => !set.has(x));
	}

	export function arrayIntersection(a: any[], b: any[]): any[] {
		const set = new Set(b);
		return a.filter((x: any) => set.has(x));
	}

	export function arrayUnion(a: any[], b: any[]): any[] {
		return Array.from(new Set([...a, ...b]));
	}

	export function arraySample(array: any[]): any {
		return array[Math.round(Math.random() * (array.length - 1))];
	}

	export function arrayTake(array: any[], n: number = 1): any[] {
		return array.slice(0, n);
	}

	export function arrayShuffle(array: any[]): any[] {
		return array.sort(() => Math.random() - 0.5);
	}

	export function leftPad(str: string, targetLength: number, padString: string): string {
		return str.padStart(targetLength, padString);
	}

	export function rightPad(str: string, targetLength: number, padString: string): string {
		return str.padEnd(targetLength, padString);
	}
}

Object.freeze(utils);
