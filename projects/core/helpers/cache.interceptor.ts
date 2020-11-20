import { Injectable } from '@angular/core';
import { HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { RequestCacheService } from 'projects/core/services/requestCache.service';

// import { Observable } from 'rxjs/Rx';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

const TTL = 10;

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
    constructor(private cache: RequestCacheService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const cachedResponse = this.cache.get(req.url);
        return cachedResponse
            ? Observable.of(cachedResponse)
            : this.sendRequest(req, next);
    }

    sendRequest(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req).do(event => {
            if (event instanceof HttpResponse) {
                this.cache.set(req.url, event, TTL);
            }
        });
    }
}
