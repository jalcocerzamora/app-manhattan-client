import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

const maxAge = 30000;
@Injectable()
export class RequestCacheService {
    private cache = new Map<string, [Date, HttpResponse<any>]>();

    get(key: any): HttpResponse<any> {
        const tuple = this.cache.get(key);
        if (!tuple) { return new HttpResponse<null>(); }

        const expires = tuple[0];
        const httpResponse = tuple[1];

        // Don't observe expired keys
        const now = new Date();
        if (expires && expires.getTime() < now.getTime()) {
            this.cache.delete(key);
            return new HttpResponse<null>();
        }

        return httpResponse;
    }

    set(key: string, value: HttpResponse<any>, ttl = null) {
        if (ttl) {
            const expires = new Date();
            expires.setSeconds(expires.getSeconds() + ttl);
            this.cache.set(key, [expires, value]);
        } else {
            this.cache.set(key, [new Date(0), value]);
        }
    }

    // put(req, response): void {
    //     const url = req.url;
    //     const entry = { url, response, lastRead: Date.now() };
    //     this.cache.set(url, entry);

    //     const expired = Date.now() - maxAge;
    //     this.cache.forEach(expiredEntry => {
    //       if (expiredEntry.lastRead < expired) {
    //         this.cache.delete(expiredEntry.url);
    //       }
    //     });
    // }
}
