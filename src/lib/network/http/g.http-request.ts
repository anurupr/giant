import { EventEmitter } from '../../common';

export class HttpRequest {
	public request: XMLHttpRequest;
	public onAbort: EventEmitter<any> = new EventEmitter();
	public onError: EventEmitter<any> = new EventEmitter();
	public onLoad: EventEmitter<any> = new EventEmitter();
	public onLoadStart: EventEmitter<any> = new EventEmitter();
	public onLoadEnd: EventEmitter<any> = new EventEmitter();
	public onProgress: EventEmitter<any> = new EventEmitter();
	public onReadyStateChange: EventEmitter<any> = new EventEmitter();
	public onReady: EventEmitter<string> = new EventEmitter();
}
