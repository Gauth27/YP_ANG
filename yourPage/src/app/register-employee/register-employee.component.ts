import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../notification.service';
import { TokenService } from '../auth/token.service';

@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.css']
})

export class RegisterEmployeeComponent implements OnInit {
  @Output() close = new EventEmitter<void>()
  @ViewChild('f', { static: false }) registerForm: NgForm;
  authToken: string
  editMode = false;
  registeredSuccess = false;
  success = null;
  public photo = "";
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private notify: NotificationService,
    private tokenService: TokenService) { }

  ngOnInit(): void {
    this.authToken = 'Bearer ' + this.tokenService.retrieveToken()
    console.log(this.authToken)
    this.menuSelector()
  }

  onRegister(form: NgForm) {
    // const photo = form.value.photo_image
    // @ViewChild ('photo_image', {static: true})
    const photo = document.getElementById("photo_image")["files"][0]
    this.getBase64(photo).then(data => console.log(data));
    const employeeDetails = JSON.stringify(form.value)
    this.http.post('http://127.0.0.1:8000/employee-registration',
      employeeDetails,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.authToken }) }
    ).subscribe(
      () => {
        // console.log(employeeDetails)
        this.notify.showSuccess('New Employee was registered', 'Success!!')
      })
  }

  onHandleError() {
    this.success = null
  }

  showToasterSuccess() {
    this.toastr.success("Data shown successfully !!")
  }

  getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  menuSelector() {
    // $('.sidebar-list-item a').removeClass('sidebarMenu-selected');
  }

  onClose() {
    this.close.emit()
  }
}


