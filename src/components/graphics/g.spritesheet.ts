import { math } from '../../lib/g.math';
import { Sprite } from './g.sprite';
import { SpriteFrame } from './g.sprite-frame';

export class Spritesheet {
	private frames: SpriteFrame[] = [];

	constructor(
		public image: HTMLImageElement,
		public data: any,
	) {
		Object.keys(data.frames).forEach((key) => {
			this.frames.push(new SpriteFrame(
				key,
				this.image,
				{
					x: data.frames[key].frame.x,
					y: data.frames[key].frame.y,
					width: data.frames[key].frame.w,
					height: data.frames[key].frame.h,
				},
			));
		});
	}

	public getFrames(name: string): SpriteFrame[] {
		return this.frames.filter((frame) => frame.name.includes(name));
	}

}
