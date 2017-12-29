import { SimpleCollection } from '../collection';
import { IScene } from './g.scene.interface';

export class Scene implements IScene {
	public collection: SimpleCollection;

	public onStart(): void {
		this.collection.iterate((element) => {
			if (element.onStart && typeof element.onStart === 'function') {
				element.onStart();
			}
		});
	}

	public onPreUpdate(ms: number, dt: number): void {
		this.collection.iterate((element) => {
			if (element.onPreUpdate && typeof element.onPreUpdate === 'function') {
				element.onPreUpdate();
			}
		});
	}

	public onUpdate(ms: number, dt: number): void {
		this.collection.iterate((element) => {
			if (element.onUpdate && typeof element.onUpdate === 'function') {
				element.onUpdate();
			}
		});
	}

	public onPostUpdate(ms: number, dt: number): void {
		this.collection.iterate((element) => {
			if (element.onPostUpdate && typeof element.onPostUpdate === 'function') {
				element.onPostUpdate();
			}
		});
	}

	public onPreDraw(ms: number, dt: number): void {
		this.collection.iterate((element) => {
			if (element.onPreDraw && typeof element.onPreDraw === 'function') {
				element.onPreDraw();
			}
		});
	}

	public onDraw(ms: number, dt: number): void {
		this.collection.iterate((element) => {
			if (element.onDraw && typeof element.onDraw === 'function') {
				element.onDraw();
			}
		});
	}

	public onPostDraw(ms: number, dt: number): void {
		this.collection.iterate((element) => {
			if (element.onPostDraw && typeof element.onPostDraw === 'function') {
				element.onPostDraw();
			}
		});
	}

	public onDestroy(): void {
		this.collection.iterate((element) => {
			if (element.onDestroy && typeof element.onDestroy === 'function') {
				element.onDestroy();
			}
		});
	}

}
