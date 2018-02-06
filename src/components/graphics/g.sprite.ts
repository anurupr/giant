import { Renderer2D, Transform2D } from '../../g.core';

export class Sprite {
	constructor(
		private image: HTMLImageElement,
		private renderer: Renderer2D,
		private transform: Transform2D = new Transform2D(),
	) {}

	public draw() {
		this.renderer.save();
		this.renderer.transform(this.transform.getMatrix());
		this.renderer.drawImage(this.image);
		this.renderer.restore();
	}
}
