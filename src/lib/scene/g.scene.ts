import { ICollection, SimpleCollection } from '../collection';
import { SceneDefinition } from './g.scene-definition.type';
import { IScene } from './g.scene.interface';

export class Scene implements IScene {
	public name: string;
	public collection: ICollection;
	private startDirty: boolean = false;

	public constructor(sceneDefinition: SceneDefinition) {
		this.parse(sceneDefinition);
	}

	public onStart(): void {
		this.startDirty = true;
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

	private parse(sceneDefinition: SceneDefinition) {
		this.name = String(sceneDefinition.name || '');
		if (sceneDefinition.collectionType === 'SimpleCollection') {
			this.collection = SimpleCollection.parse(sceneDefinition.collection);
		}
	}

}
