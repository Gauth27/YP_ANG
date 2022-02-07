import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TokenService } from '../auth/token.service';

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
  @Output() employeeSelected = new EventEmitter<any>();
  constructor(private http: HttpClient,
    private tokenService: TokenService) {

  }

  ngOnInit(): void {
    this.authToken = 'Bearer ' + this.tokenService.retrieveToken()
    this.fetchData()
    this.checkScrollPos()
    console.log(this.authToken)
  }

  fetchData() {
    let url = 'http://127.0.0.1:8000/api/list?page=' + this.pageNum
    this.http.get<{}>(url,
      { headers: new HttpHeaders({ 'Authorization': this.authToken }) }
    ).subscribe(
      (data) => {
        console.log(data['results'])
        data['results'].forEach(element => {
          this.employeesList.push(element)
        });
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
        this.pageNum++;
        this.fetchData()
      }
    });
  }

  onClickDetails(id: number) {
    this.http.get(`http://127.0.0.1:8000/api/details/${id}`,
      { headers: new HttpHeaders({ 'Authorization': this.authToken }) }
    ).subscribe(
      (data) => {
        console.log(data)
        this.employee = data
        this.displayDetails = true;
        console.log(this.employee)
        this.employeeSelected.emit(this.employee)
      })
  }

  onClose() {
    this.displayDetails = false;
  }
}
