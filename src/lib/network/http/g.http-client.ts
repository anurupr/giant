import { HttpRequest } from './g.http-request';

export class HttpClient {

	public post(url: string, params: object|FormData): HttpRequest {
		return this.ajax('POST', url, params);
	}

	public get(url: string): HttpRequest {
		return this.ajax('GET', url);
	}

	public delete(url: string): HttpRequest {
		return this.ajax('DELETE', url);
	}

	public ajax(method: string, url: string, params?: object|FormData): HttpRequest {
		const httpRequest: HttpRequest = new HttpRequest();
		httpRequest.request = (window as any).XMLHttpRequest ?
			new XMLHttpRequest() :
			new (window as any).ActiveXObject('Microsoft.XMLHTTP');

		httpRequest.request.open(method, url, true);

		httpRequest.request.onabort = (event) => { httpRequest.onAbort.emit(event); };
		httpRequest.request.onerror = (event) => { httpRequest.onError.emit(event); };
		httpRequest.request.onload = (event) => { httpRequest.onLoad.emit(event); };
		httpRequest.request.onloadend = (event) => { httpRequest.onLoadEnd.emit(event); };
		httpRequest.request.onloadstart = (event) => { httpRequest.onLoadStart.emit(event); };
		httpRequest.request.onprogress = (event) => { httpRequest.onProgress.emit(event); };

		httpRequest.request.onreadystatechange = (event) => {
			httpRequest.onReadyStateChange.emit(event);
			if (httpRequest.request.readyState === 4) {
				if (httpRequest.request.status === 200) {
					httpRequest.onReady.emit(httpRequest.request.responseText);
				}
			}
		};

		httpRequest.request.send(params);
		return httpRequest;
	}
}
