import { EventEmitter } from '../g.event-emitter';

export class MouseInput {
	private static readonly LEFT_BUTTON: number = 0;
	private static readonly RIGHT_BUTTON: number = 2;
	private static readonly AUXILIAR_BUTTON: number = 1;
	private static instances: MouseInput[] = [];

	public pageX: number;
	public pageY: number;
	public screenX: number;
	public screenY: number;

	public isLeftButtonPressed: boolean = false;
	public isRightButtonPressed: boolean = false;
	public isAuxiliarButtonPressed: boolean = false;

	public onDown: EventEmitter<any> = new EventEmitter();
	public onUp: EventEmitter<any> = new EventEmitter();
	public onMove: EventEmitter<any> = new EventEmitter();
	public onWheelMove: EventEmitter<any> = new EventEmitter();

	constructor() {
		MouseInput.instances.push(this);

		if (MouseInput.instances.length === 0) {
			addEventListener('mousedown', (event) => {
				MouseInput.instances.forEach((instance) => instance.triggerDown(event));
			});

			addEventListener('mouseup', (event) => {
				MouseInput.instances.forEach((instance) => instance.triggerUp(event));
			});

			addEventListener('mousemove', (event) => {
				MouseInput.instances.forEach((instance) => instance.triggerMove(event));
			});

			addEventListener('mousewheel', (event) => {
				MouseInput.instances.forEach((instance) => instance.triggerWheelMove(event));
			});
		}
	}

	/**
	 *  Simulates a mouse down event.
	 */
	public triggerDown(init?: MouseEventInit): void {
		const event = new MouseEvent('mousedown', init);
		this.onDown.emit(event);
	}

	/**
	 *  Simulates a mouse up event.
	 */
	public triggerUp(init?: MouseEventInit): void {
			const event = new MouseEvent('mousedown', init);
			this.onUp.emit(event);
	}

	/**
	 *  Simulates a mouse move event.
	 */
	public triggerMove(init?: MouseEventInit): void {
			const event = new MouseEvent('mousedown', init);
			this.onMove.emit(event);
	}

	/**
	 *  Simulates a wheel move event.
	 */
	public triggerWheelMove(init?: MouseEventInit): void {
			const event = new MouseEvent('mousedown', init);
			this.onWheelMove.emit(event);
	}

	private mouseDown(event: MouseEvent): void {
		if (event.button === MouseInput.LEFT_BUTTON) {
			this.isLeftButtonPressed = true;
		}
		if (event.button === MouseInput.RIGHT_BUTTON) {
			this.isRightButtonPressed = true;
		}
		if (event.button === MouseInput.AUXILIAR_BUTTON) {
			this.isAuxiliarButtonPressed = true;
		}

		this.pageX = Number(event.pageX || 0);
		this.pageY = Number(event.pageY || 0);
		this.screenX = Number(event.screenX || 0);
		this.screenY = Number(event.screenY || 0);

		this.triggerDown(event);
	}

	private mouseUp(event: MouseEvent): void {
		if (event.button === MouseInput.LEFT_BUTTON) {
			this.isLeftButtonPressed = false;
		}
		if (event.button === MouseInput.RIGHT_BUTTON) {
			this.isRightButtonPressed = false;
		}
		if (event.button === MouseInput.AUXILIAR_BUTTON) {
			this.isAuxiliarButtonPressed = false;
		}

		this.pageX = Number(event.pageX || 0);
		this.pageY = Number(event.pageY || 0);
		this.screenX = Number(event.screenX || 0);
		this.screenY = Number(event.screenY || 0);

		this.triggerUp(event);
	}

	private mouseMove(event: MouseEvent): void {
		this.pageX = event.pageX;
		this.pageY = event.pageY;
		this.screenX = event.screenX;
		this.screenY = event.screenY;

		this.triggerUp(event);
	}

	private wheelMove(event: MouseWheelEvent): void {
		this.triggerWheelMove(event);
	}
}
