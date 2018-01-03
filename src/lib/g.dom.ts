export namespace dom {
	export function query(tagName: string): NodeListOf<HTMLElement> {
		return document.querySelectorAll(tagName);
	}

	export function create(tagName: string): HTMLElement {
		return document.createElement(tagName);
	}

	export function insert(position: InsertPosition, content: HTMLElement, element: HTMLElement): Element | null {
		return element.insertAdjacentElement(position, content);
	}

	export function remove(element: HTMLElement): void {
		if (element.parentNode !== null) {
			element.parentNode.removeChild(element);
		}
	}

	export function html(element: HTMLElement, content: string): void {
		element.innerHTML = content;
	}
}
