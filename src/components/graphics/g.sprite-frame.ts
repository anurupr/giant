import { math } from '../../lib/g.math';

export class SpriteFrame {
	constructor(
		public name: string,
		public image: HTMLImageElement,
		public frame: math.IRectangle = { x: 0, y: 0, width: image.width, height: image.height },
	) {}
}
