import { EventEmitter } from './g.event-emitter';

export interface IAsset {
	id: string;
	type: string;
	src: string;
}

export class AssetManager {
	public onAssetsReady: EventEmitter<boolean> = new EventEmitter();

	public imageStack: Array<{ id: string, element: HTMLImageElement }> = [];
	public audioStack: Array<{ id: string, element: HTMLAudioElement }> = [];

	constructor(private assetQueue: IAsset[] = []) {
		assetQueue.forEach((asset, index) => {
			this.load(asset, index);
		});
	}

	public add(asset: IAsset) {
		this.assetQueue.push(asset);
		this.load(asset, this.assetQueue.length);
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

	private load(asset: IAsset, index: number) {
		switch (asset.type) {
			case 'image':
				this.loadImage(asset, index);
				break;
			case 'audio':
				this.loadAudio(asset, index);
				break;
		}
	}

	private loadImage(asset: IAsset, index: number) {
		const image = new Image();
		image.src = asset.src;
		image.onload = () => {
			this.imageStack.push({ id: asset.id, element: image });
			this.assetQueue.splice(index, 1);
			if (this.assetQueue.length === 0) {
				this.onAssetsReady.emit(true);
			}
		};
	}

	private loadAudio(asset: IAsset, index: number) {
		const audio = new Audio();
		audio.src = asset.src;
		audio.onload = () => {
			this.audioStack.push({ id: asset.id, element: audio });
			this.assetQueue.splice(index, 1);
			if (this.assetQueue.length === 0) {
				this.onAssetsReady.emit(true);
			}
		};
	}

}
