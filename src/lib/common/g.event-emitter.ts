export class EventEmitter<T> {
	private subscribers: Array<(value: T) => void> | undefined = [];

	public emit(value: T) {
		setTimeout(() => {
			(this.subscribers || []).forEach((subscriber) => {
				subscriber(value);
			});
		});
	}

	public subscribe(subscriber: (value: T) => void) {
		(this.subscribers || []).push(subscriber);
		return this;
	}

	public unsubscribe(subscriber: (value: T) => void) {
		const index = (this.subscribers || []).indexOf(subscriber);
		if (index > -1) {
			(this.subscribers || []).splice(index);
		}
		return this;
	}

	public onDestroy() {
		this.subscribers = undefined;
	}
}
