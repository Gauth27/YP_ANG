import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { TokenService } from "../auth/token.service";

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    authToken: string
    
    constructor(private http: HttpClient, private tokenService: TokenService, private navRoute: Router, ) { }
    
    fetchEmployeeByID(id: number) {
        this.authToken = 'Bearer ' + this.tokenService.retrieveToken()
        return this.http.get(`http://127.0.0.1:8000/details/${id}`,
            { headers: new HttpHeaders({ 'Authorization': this.authToken }) }
        )
    }

    fetchEmployeesByName(name: string) {
        return this.http.get(`http://127.0.0.1:8000/employee-search?name=${name}`,
            // { headers: new HttpHeaders({ 'name': name }) }
        )
    }
}