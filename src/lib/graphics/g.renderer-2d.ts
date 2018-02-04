import { dom } from '../g.dom';
import { Matrix3 } from '../matrix';

export class Renderer2D {
	public canvas: HTMLCanvasElement;
	public context: CanvasRenderingContext2D;

	constructor(width: number, height: number) {
		this.createCanvas(width, height);
		this.createContext();
	}

	public clear(): void {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	public save(): void {
		this.context.save();
	}

	public transform(matrix: Matrix3) {
		this.context.transform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f);
	}

	public restore(): void {
		this.context.restore();
	}

	public drawImage(image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap): void {
		this.context.drawImage(image, 0, 0, 1, 1);
	}

	public drawRectangle(x: number = 0, y: number = 0, width: number = 1, height: number = 1) {
		this.context.beginPath();
		this.context.rect(x, y, width, height);
		this.context.closePath();
		this.context.fill();
		this.context.stroke();
	}

	public drawCircle(x: number = 0, y: number = 0, radius: number = 1) {
		this.context.beginPath();
		this.context.arc(x, y, radius, 0, Math.PI * 2, false);
		this.context.closePath();
	}

	public drawText(text: string, x: number = 0, y: number = 0, maxWidth?: number) {
		this.context.fillText(text, x, y, maxWidth);
	}

	private createCanvas(width: number, height: number): void {
		this.canvas = dom.create('canvas') as HTMLCanvasElement;
		this.canvas.width = width;
		this.canvas.height = height;
		dom.insert('beforeend', this.canvas, dom.query('body').item(0));
	}

	private createContext() {
		const context = this.canvas.getContext('2d');
		if (context) {
			context.webkitImageSmoothingEnabled = false;
			context.mozImageSmoothingEnabled = false;
			context.oImageSmoothingEnabled = false;
			context.imageSmoothingEnabled = false;

			context.fillStyle = 'transparent';
			context.strokeStyle = 'transparent';

			this.context = context;
		}
	}

}
