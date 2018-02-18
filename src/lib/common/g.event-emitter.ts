export type Subscription<T> = (value?: T) => void;

export class EventEmitter<T> {
	private subscribers: Array<Subscription<T>> | undefined = [];

	public emit(value?: T) {
		setTimeout(() => {
			(this.subscribers || []).forEach((subscriber) => {
				subscriber(value);
			});
		});
	}

	public subscribe(subscriber: Subscription<T>): Subscription<T> {
		(this.subscribers || []).push(subscriber);
		return subscriber;
	}

	public unsubscribe(subscriber: Subscription<T>): this {
		const index = (this.subscribers || []).indexOf(subscriber);
		if (index > -1) {
			(this.subscribers || []).splice(index);
		}

		return this;
	}

	public unsubscribeAll(): this {
		this.subscribers = undefined;
		return this;
	}
}
