import { Injectable } from '@angular/core';
import { HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { RequestCacheService } from '@core/services/helpers/requestCache.service';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

const TTL: any = 15;

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
    constructor(private cache: RequestCacheService) {
        // console.log('CacheInterceptor.constructor');
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // console.log('CacheInterceptor.intercept');
        const cachedResponse = this.cache.get(req.url);
        return cachedResponse
            ? Observable.of(cachedResponse)
            : this.sendRequest(req, next, this.cache);
    }

    sendRequest(req: HttpRequest<any>, next: HttpHandler, cache: RequestCacheService): Observable<HttpEvent<any>> {
        // console.log('CacheInterceptor.sendRequest');
        return next.handle(req).do(event => {
            if (event instanceof HttpResponse) {
                this.cache.set(req.url, event, TTL);
            }
        });
        // return next.handle(req).pipe( tap(event => { if (event instanceof HttpResponse) { cache.put(req, event); } }));
    }
}
