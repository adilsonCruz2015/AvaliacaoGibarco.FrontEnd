import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    
    constructor() {}

    private storage: object = {};

    getCookie(key: string): string {
        return this.storage[key] || localStorage.getItem(key) || null;
    }

    setCookie(key: string, value: string): void {
        this.storage[key] = value;
        localStorage.setItem(key, value);
    }

    removeCookie(key: string): void {
        this.storage[key] = null;
        localStorage.setItem(key, null);
        localStorage.removeItem(key);
    }
}