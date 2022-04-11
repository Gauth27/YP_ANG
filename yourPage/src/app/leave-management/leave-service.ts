import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { TokenService } from "../auth/token.service";


@Injectable({
    providedIn: 'root'
})
export class LeaveService {
    authToken: string

    constructor(
        private http: HttpClient,
        private navRoute: Router,
        private tokenService: TokenService,
    ) { }

    display_Leave_Balance() {
        this.authToken = 'Bearer ' + this.tokenService.retrieveToken()
        return this.http.get<{}>('http://127.0.0.1:8000/leave/balance',
            { headers: new HttpHeaders({ 'Authorization': this.authToken }) }
        )
    }

    leave_application(leave_data) {
        this.authToken = 'Bearer ' + this.tokenService.retrieveToken()
        return this.http.post('http://127.0.0.1:8000/leave/apply-leave',
            leave_data,
            { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.authToken }) }
        )
    }
}