import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { hideLoading, showLoading } from '../app.component';
import { TokenService } from '../auth/token.service';
import { EmployeeService } from '../employee-details/employee.services';

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
  employeeSelected = new EventEmitter<any>();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private empService: EmployeeService
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
    let url = 'http://127.0.0.1:8000/list?page=' + this.pageNum
    this.http.get<{}>(url,
      { headers: new HttpHeaders({ 'Authorization': this.authToken }) }
    ).subscribe(
      (data) => {
        console.log(data['results'])
        data['results'].forEach(element => {
          this.employeesList.push(element)
        });
        hideLoading();
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
}
