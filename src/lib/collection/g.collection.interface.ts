export interface ICollection {
	add(object: any): void;
	remove(object: any): void;
	iterate(callback: (object: any) => void): void;
}