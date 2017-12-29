import { ICollection } from './g.collection.interface';

export class SimpleCollection implements ICollection {
	private data: any[] = [];

	public add(object: any): void {
		this.data.push(object);
	}

	public remove(object: any): void {
		const index = this.data.findIndex((element) => element === object);
		if (index > -1) {
			this.data.splice(index, 0);
		}
	}

	public iterate(callback: (object: any) => void): void {
		this.data.map(callback);
	}

}
