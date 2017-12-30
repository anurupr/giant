import { ICollection } from './g.collection.interface';

export class SimpleCollection implements ICollection {
	public static parse(collection: Array<{ class: any, settings: any }>): SimpleCollection {
		const parsedCollection = new SimpleCollection();
		if (collection && Array.isArray(collection)) {
			collection.forEach((obj) => {
				const instance = new obj.class();
				Object.assign(instance, obj.settings);
				parsedCollection.add(instance);
			});
		}
		return parsedCollection;
	}

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
		this.data.forEach(callback);
	}

}
