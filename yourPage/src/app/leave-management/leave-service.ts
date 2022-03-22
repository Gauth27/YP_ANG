import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { TokenService } from "../auth/token.service";
import { NotificationService } from "../notification.service";
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class LeaveService {
    authToken: string

    constructor(
        private http: HttpClient,
        private navRoute: Router,
        private tokenService: TokenService,
        private toastr: ToastrService,
        private notify: NotificationService,
    ) { }

    display_Leave_Balance() {
        this.authToken = 'Bearer ' + this.tokenService.retrieveToken()
        return this.http.get<{}>('http://127.0.0.1:8000/leave/balance',
            { headers: new HttpHeaders({ 'Authorization': this.authToken }) }
        )
    }

    leave_application(leave_data) {
        this.authToken = 'Bearer ' + this.tokenService.retrieveToken()
        this.http.post('http://127.0.0.1:8000/leave/apply-leave',
            leave_data,
            { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.authToken }) }
        ).subscribe(
            () => {
                // console.log(employeeDetails)
                this.notify.showSuccess('Leave was applied', 'Success!!')
            })

    }

    dateError() {
        this.notify.showError("Check the Dates again!!\n End Date can't before start date", 'Error')
    }

    showToasterSuccess() {
        this.toastr.success("Data shown successfully !!")
    }

    showToasterError() {
        this.toastr.error("From Date should be before To Date!")
    }
}