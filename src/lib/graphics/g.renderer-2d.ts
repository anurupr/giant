import { dom } from '../g.dom';

export class Renderer2D {
	public canvas: HTMLCanvasElement;
	public context: CanvasRenderingContext2D | null;

	constructor(width: number, height: number) {
		this.createCanvas(width, height);
		this.createContext();
	}

	public clear(): void {
		if (this.context) {
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}
	}

	public getContext(): CanvasRenderingContext2D | null {
		return this.context;
	}

	private createCanvas(width: number, height: number): void {
		this.canvas = dom.create('canvas') as HTMLCanvasElement;
		this.canvas.width = width;
		this.canvas.height = height;
		dom.insert('beforeend', this.canvas, dom.query('body').item(0));
	}

	private createContext() {
		this.context = this.canvas.getContext('2d');
	}

}
