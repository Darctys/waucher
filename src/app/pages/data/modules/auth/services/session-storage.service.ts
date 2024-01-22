import { Injectable } from '@angular/core';
import { IJWTSession } from '../interfaces/jwt-session.interface';

@Injectable()
export class SessionStorageService {

    private _sessionData!: IJWTSession | null;

    private _sessionToken = 'session';


    public getSessionData(): IJWTSession | null {
        if (!localStorage.getItem(this._sessionToken)) {
            return null
        } else {
            const sessionData = localStorage.getItem(this._sessionToken)
            if (sessionData) {
                this._sessionData = JSON.parse(sessionData) as IJWTSession
                return this._sessionData;
            } else {
                return null;
            }
        }
    }

    public setSessionData(data: IJWTSession): void {
        localStorage.setItem(this._sessionToken, JSON.stringify(data))
    }

    public setAdditionalData(key: string, data: any): void {
      localStorage.setItem(key, JSON.stringify(data));
    }

    public removeSession() {
        localStorage.clear()
        this._sessionData = null;
    }
}
