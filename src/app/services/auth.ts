import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class Auth {
    private http = inject(HttpClient);
    private apiUrl = 'https://apilords1.codefactory.games/api';

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('authToken');
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }

    login(credentials: { email: string; password: string }): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/user/login`, credentials).pipe(
            tap(response => {
                if (response && response.token) {
                    localStorage.setItem('authToken', response.token);
                    localStorage.setItem('isLoggedIn', 'true');

                    // Capture and store current login date & time
                    const now = new Date();
                    localStorage.setItem('loginTimestamp', now.toISOString());
                }
            })
        );
    }

    getUserProfile(): Observable<any> {
        return this.http.get(`${this.apiUrl}/admin/user/profile`, { headers: this.getHeaders() });
    }

    getUserBalance(): Observable<any> {
        return this.http.get(`${this.apiUrl}/user/balance`, { headers: this.getHeaders() });
    }

    getUserExposure(userId: number | string): Observable<any> {
        return this.http.post(`${this.apiUrl}/user/exposure`, { user_id: userId }, { headers: this.getHeaders() });
    }

    getPlatformconfig(): Observable<any> {
        return this.http.get(`${this.apiUrl}/admin/platformconfig`, { headers: this.getHeaders() });
    }

    getHeaderName(): Observable<any> {
        return this.http.get(`${this.apiUrl}/admin/user/profile`, { headers: this.getHeaders() });
    }

    getStake(): Observable<any> {
        return this.http.get(`${this.apiUrl}/user/stake-button-values`, { headers: this.getHeaders() });
    }
    updateStake(stakes: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/user/stake-button-values`, stakes, { headers: this.getHeaders() });
    }

    // Home Page APIs
    getCricketMatchList(id: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/user/cricket/all-data`, id, { headers: this.getHeaders() });
    }

    getMatchPrivateData(payload: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/user/cricket/get-match-private-data`, payload, { headers: this.getHeaders() });
    }

    //my bets
   
    // 2.   /user/cancel-bet post
    // 3.    /lords/transfer/statement post {}

    getSportsBets(params: any): Observable<any> {
        return this.http.get(
            `${this.apiUrl}/user/cricket/sports-bets/user`,
            {
                headers: this.getHeaders(),
                params: params
            }
        );
    }

    getCancelBets(payload: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/user/cancel-bet post`, payload, { headers: this.getHeaders() });
    }

    getTransferStatements(): Observable<any> {
        return this.http.post(`${this.apiUrl}/lords/transfer/statement`, {}, { headers: this.getHeaders() });
    }
}