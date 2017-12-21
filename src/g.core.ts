export * from './lib';

export namespace metadata {
	export const name: string = 'Giant Engine';
	export const version: string = 'v0.1.8';
}

Object.freeze(metadata);

export namespace core {
	export const root: string = 'src/';
	export const libraries: string = 'libraries/';
}

Object.freeze(core);
