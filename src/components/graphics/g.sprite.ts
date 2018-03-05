import { Renderer2D, Transform2D } from '../../g.core';
import { SpriteFrame } from './g.sprite-frame';

export class Sprite {
	public alpha: number = 1;
	public fps: number = 60;
	private transform: Transform2D;
	private currentFrameIndex: number = 0;
	private renderer: Renderer2D;
	private timer: number = 0;

	constructor(
		private frames: SpriteFrame[],
	) {}

	public onUpdate(ms: number = 0, dt: number = 0.016) {
		if (this.timer >= (1 / this.fps)) {
			this.nextFrame();
			this.timer = 0;
		}

		this.timer += dt;
	}

	public onDraw() {
		this.renderer.save();
		this.renderer.alpha = this.alpha;
		this.renderer.transform(this.transform.getMatrix());
		this.renderer.drawImage(
			this.currentFrame.image,
			this.currentFrame.frame.x,
			this.currentFrame.frame.y,
			this.currentFrame.frame.width,
			this.currentFrame.frame.height,
		);
		this.renderer.restore();
	}

	public get currentFrame() {
		return this.frames[this.currentFrameIndex];
	}

	public setFrames(frames: SpriteFrame[]) {
		this.frames = frames;
		this.currentFrameIndex = 0;
	}

	public getFrames(): SpriteFrame[] {
		return this.frames;
	}

	private nextFrame() {
		if (this.currentFrameIndex < this.frames.length - 1) {
			this.currentFrameIndex++;
		} else {
			this.currentFrameIndex = 0;
		}
	}

	private previousFrame() {
		if (this.currentFrameIndex > 0) {
			this.currentFrameIndex--;
		} else {
			this.currentFrameIndex = this.frames.length;
		}
	}
}
