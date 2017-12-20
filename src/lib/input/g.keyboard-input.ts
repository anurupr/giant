import { EventEmitter } from '../g.event-emitter';

export class KeyboardInput {
	private static instances: KeyboardInput[] = [];

	public lastKey: string;
	public readonly activeKeys: string[] = [];

	public onDown: EventEmitter<any> = new EventEmitter();
	public onUp: EventEmitter<any> = new EventEmitter();

	constructor() {
		KeyboardInput.instances.push(this);

		if (KeyboardInput.instances.length === 0) {
			addEventListener('keydown', (event) => {
				KeyboardInput.instances.forEach((instance) => instance.triggerDown(event));
			});

			addEventListener('keyup', (event) => {
				KeyboardInput.instances.forEach((instance) => instance.triggerUp(event));
			});
		}
	}

	public check(...keys: string[]) {
		return this.activeKeys.reduce((prev, key) => {
			return prev || keys.indexOf(key) > -1;
		}, false);
	}

	/**
	 *  Simulates a key down event.
	 */
	public triggerDown(init?: KeyboardEventInit): void {
		const event = new KeyboardEvent('keydown', init);
		this.onDown.emit(event);
	}

	/**
	 *  Simulates a key up event.
	 */
	public triggerUp(init?: KeyboardEventInit): void {
		const event = new KeyboardEvent('keyup', init);
		this.onUp.emit(event);
	}

	private keyDown(event: KeyboardEvent): void {
		if (this.activeKeys.indexOf(event.code) === -1) {
			this.activeKeys.push(event.code);
		}

		this.lastKey = event.code;
		this.onDown.emit(event);
	}

	private keyUp(event: KeyboardEvent): void {
		this.activeKeys.splice(this.activeKeys.indexOf(event.code), 1);
		this.onDown.emit(event);
	}
}