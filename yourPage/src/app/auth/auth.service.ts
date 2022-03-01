import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Route, Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { TokenService } from "./token.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isAuthenticated = false
    isAdmin = false
    token: string = ''
    employeeID: string

    constructor(
        private http: HttpClient,
        private navRoute: Router,
        private tokenService: TokenService) { }

    onLogin(loginCredentials) {
        this.http.post('http://127.0.0.1:8000/login-page',
            loginCredentials,
            { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
        ).subscribe(
            response => {
                this.tokenService.setToken(response['token'].toString(), response['is_admin'], response['employeeID'])
                // localStorage.setItem("TOKEN", response['token'].toString())
                // localStorage.setItem("ADMIN", response['is_admin'])
                // this.isAuthenticated = true
                this.isAdmin = response['is_admin']
                this.employeeID = response['employeeID']
                this.navRoute.navigate(['/home'])
            },
            error => {
                console.log(error.message)
            }
        )
    }
    onLogout() {
        this.tokenService.deleteTOken()
    }
}