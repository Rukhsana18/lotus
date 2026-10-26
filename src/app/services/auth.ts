import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from '@angular/core';
import { tap } from 'rxjs/operators';

@Service()
export class Auth {
    private http = inject(HttpClient);
    private apiUrl = 'https://apilords1.codefactory.games/api';

    login(credentials: { email: string; password: string }): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/user/login`, credentials).pipe(
            tap(response => {
                // Assuming the response returns a token property (adjust based on actual API response structure)
                if (response && response.token) {
                    localStorage.setItem('authToken', response.token);
                    localStorage.setItem('isLoggedIn', 'true');
                }
            })
        );
    }
}
