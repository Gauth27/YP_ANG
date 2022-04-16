import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { TokenService } from "../auth/token.service";

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    authToken: string

    constructor(
        private http: HttpClient,
        private tokenService: TokenService,
        private navRoute: Router
    ) { }

    fetchEmployees(pageNum: number) {
        this.authToken = 'Bearer ' + this.tokenService.retrieveToken()
        let url = 'http://127.0.0.1:8000/list?page=' + pageNum
        return this.http.get<{}>(url,
            { headers: new HttpHeaders({ 'Authorization': this.authToken }) }
        )
    }

    fetchEmployeeByID(id: number) {
        this.authToken = 'Bearer ' + this.tokenService.retrieveToken()
        return this.http.get(`http://127.0.0.1:8000/details/${id}`,
            { headers: new HttpHeaders({ 'Authorization': this.authToken }) }
        )
    }

    fetchEmployeesByName(name: string) {
        this.authToken = 'Bearer ' + this.tokenService.retrieveToken()
        return this.http.get(`http://127.0.0.1:8000/employee-search?name=${name}`,
            { headers: new HttpHeaders({ 'Authorization': this.authToken }) }
        )
    }

    registerEmployee(formData: string) {
        this.authToken = 'Bearer ' + this.tokenService.retrieveToken()
        return this.http.post('http://127.0.0.1:8000/employee-registration',
            formData,
            { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.authToken }) }
        )
    }

    deleteEmployee(id: number) {
        this.authToken = 'Bearer ' + this.tokenService.retrieveToken()
        return this.http.delete(`http://127.0.0.1:8000/delete-employee/${id}`,
            { headers: new HttpHeaders({ 'Authorization': this.authToken }) }
        )
    }

    updateEmployeeDetails(id: number, data) {
        this.authToken = 'Bearer ' + this.tokenService.retrieveToken()
        return this.http.put(`http://127.0.0.1:8000/edit-employee/${id}`,
            data,
            { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.authToken }) }
        )
    }

}