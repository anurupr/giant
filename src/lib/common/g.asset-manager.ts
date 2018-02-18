import { Spritesheet } from '../../components/graphics/g.spritesheet';
import { HttpClient } from '../network';
import { EventEmitter } from './g.event-emitter';

export interface IAsset {
	id: string;
	type: 'image' | 'audio' | 'json' | 'text';
	src: string;
}

export class AssetManager {
	public onAssetsReady: EventEmitter<void> = new EventEmitter();

	private imageStack: Array<{ id: string, element: HTMLImageElement }> = [];
	private audioStack: Array<{ id: string, element: HTMLAudioElement }> = [];
	private JSONStack: Array<{ id: string, element: object }> = [];
	private textStack: Array<{ id: string, element: string }> = [];
	private http: HttpClient = new HttpClient();

	constructor(private assetQueue: IAsset[] = []) {
		assetQueue.forEach((asset, index) => {
			this.load(asset);
		});
	}

	public add(asset: IAsset) {
		this.assetQueue.push(asset);
		this.load(asset);
	}

	public getImage(assetID: string): HTMLImageElement | null {
		const imageAsset = this.imageStack.find((image) => image.id === assetID);
		if (imageAsset) {
			return imageAsset.element;
		} else {
			return null;
		}
	}

	public getAudio(assetID: string): HTMLAudioElement | null {
		const audioAsset = this.audioStack.find((audio) => audio.id === assetID);
		if (audioAsset) {
			return audioAsset.element;
		} else {
			return null;
		}
	}

	public getJSON(assetID: string): object | null {
		const jsonAsset = this.JSONStack.find((asset) => asset.id === assetID);
		if (jsonAsset) {
			return jsonAsset.element;
		} else {
			return null;
		}
	}

	public getText(assetID: string): string | null {
		const textAsset = this.textStack.find((asset) => asset.id === assetID);
		if (textAsset) {
			return textAsset.element;
		} else {
			return null;
		}
	}

	private load(asset: IAsset) {
		switch (asset.type) {
			case 'image':
				this.loadImage(asset);
				break;
			case 'audio':
				this.loadAudio(asset);
				break;
			case 'json':
				this.loadJSONFile(asset);
				break;
			case 'text':
				this.loadTextFile(asset);
				break;
		}
	}

	private loadImage(asset: IAsset) {
		const image = new Image();
		image.src = asset.src;
		image.onload = () => {
			this.imageStack.push({ id: asset.id, element: image });
			this.assetQueue.splice(this.assetQueue.indexOf(asset), 1);
			if (this.assetQueue.length === 0) {
				this.onAssetsReady.emit();
			}
		};
	}

	private loadAudio(asset: IAsset) {
		const audio = new Audio();
		audio.src = asset.src;
		audio.onload = () => {
			this.audioStack.push({ id: asset.id, element: audio });
			this.assetQueue.splice(this.assetQueue.indexOf(asset), 1);
			if (this.assetQueue.length === 0) {
				this.onAssetsReady.emit();
			}
		};
	}

	private loadJSONFile(asset: IAsset) {
		const eventEmitter = this.http.get(asset.src).onReady;
		eventEmitter.subscribe((data) => {
			eventEmitter.unsubscribeAll();
			this.JSONStack.push({ id: asset.id, element: JSON.parse(data || '') });
			this.assetQueue.splice(this.assetQueue.indexOf(asset), 1);
			if (this.assetQueue.length === 0) {
				this.onAssetsReady.emit();
			}
		});
	}

	private loadTextFile(asset: IAsset) {
		const eventEmitter = this.http.get(asset.src).onReady;
		eventEmitter.subscribe((data) => {
			eventEmitter.unsubscribeAll();
			this.textStack.push({ id: asset.id, element: data || '' });
			this.assetQueue.splice(this.assetQueue.indexOf(asset), 1);
			if (this.assetQueue.length === 0) {
				this.onAssetsReady.emit();
			}
		});
	}

}
