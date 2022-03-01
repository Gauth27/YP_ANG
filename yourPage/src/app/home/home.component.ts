import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { EmployeeService } from '../employee-details/employee.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  employeeName: string
  employeeSelected: {}
  displayDetails = false
  constructor(
    private authService: AuthService,
    private empService: EmployeeService
  ) { }

  ngOnInit(): void {
    console.log(this.authService.employeeID)
    // const id = + this.authService.employeeID
    const id = + localStorage.getItem("empID")
    if (id) {
      this.empService.fetchEmployeeByID(id).subscribe(
        (data) => {
          console.log(data)
          this.employeeSelected = data
          this.employeeName = data['name']
          this.displayDetails = true
        }
      )
    }
  }

}
