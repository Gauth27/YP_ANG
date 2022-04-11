import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { hideLoading, showLoading } from '../app.component';
import { TokenService } from '../auth/token.service';
import { EmployeeService } from '../employee-details/employee.services';
import { NotificationService } from "../notification.service";
import { ToastrService } from 'ngx-toastr';

import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  authToken: string
  employee: {}
  employeesList = [];
  pageNum = 1;
  displayDetails = false;
  displayForm = false;
  displayEditForm = false;
  employeeSelected = new EventEmitter<any>();
  addOrEdit = new EventEmitter<any>();
  employeeSearch: string
  isEdit: Boolean = false;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private empService: EmployeeService,
    private router: Router,
    private toastr: ToastrService,
    private notify: NotificationService,
    private confirmationDialogService: ConfirmationDialogService,
  ) {

  }

  ngOnInit(): void {
    showLoading();
    this.authToken = 'Bearer ' + this.tokenService.retrieveToken()
    this.fetchData()
    this.checkScrollPos()
    console.log(this.authToken)
  }

  fetchData() {
    this.empService.fetchEmployees(this.pageNum)
    .subscribe(
      (data) => {
        console.log(data['results'])
        data['results'].forEach(element => {
          this.employeesList.push(element)
        });
        hideLoading();
      },
      error => {
        hideLoading();
        if (error.status == 401) { this.router.navigate(['login']); }
      })
  }

  fetchEmployeesByName(name) {
    console.log('Name', name)
    this.empService.fetchEmployeesByName(name)
      .subscribe(
        (data) => {
          console.log(data)
        }
      )
  }

  checkScrollPos() {
    let elementData = document.getElementById("employeeData")
    elementData.addEventListener("scroll", (event) => {
      var a = elementData.scrollTop;
      var b = elementData.scrollHeight - elementData.clientHeight;
      let scrollPosition = Math.round((a / b) * 100)
      if (scrollPosition === 100) {
        showLoading();
        this.pageNum++;
        this.fetchData()
      }
    });
  }

  onClickDetails(id: number) {
    showLoading();
    this.empService.fetchEmployeeByID(id).subscribe(
      (data) => {
        console.log(data)
        this.employee = data
        this.displayDetails = true;
        console.log(this.employee)
        this.employeeSelected.emit(this.employee)
        hideLoading();
      })
  }

  onClose() {
    this.displayDetails = false;
  }

  onAddEmployee() {
    this.displayForm = true;
  }

  onCloseForm() {
    this.displayForm = false;
    this.employeesList = []  // IS this CORRECT??
    this.fetchData()
  }

  onCloseEditForm() {
    this.displayEditForm = false;
    this.employeesList = []  // IS this CORRECT??
    this.fetchData()
  }

  deleteEmployee(id: number) {
    this.confirmationDialogService.confirm('Do you really want to Delete this Employee??')
      // .then((confirmed) => console.log('User confirmed:', confirmed))
      .then(() => {
        this.empService.deleteEmployee(id)
          .subscribe(
            () => {
              this.employeesList = []  // IS this CORRECT??
              this.fetchData()
              this.delEmpSuccess()
            })
      }).catch(() => console.log('User dismissed the dialog'));
  }

  editEmployee(id: number) {
    showLoading();
    this.isEdit = true;
    this.empService.fetchEmployeeByID(id).subscribe(
      (data) => {
        this.employee = data
        this.displayForm = true;
        this.employeeSelected.emit(this.employee)
        this.addOrEdit.emit(this.isEdit)
        hideLoading();
      })
  }

  delEmpSuccess() {
    this.toastr.info("Employee was deleted successfully")
  }

}
