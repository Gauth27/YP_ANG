import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../notification.service';
import { TokenService } from '../auth/token.service';
import { hideLoading, showLoading } from '../app.component';

@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.css']
})

export class RegisterEmployeeComponent implements OnInit {
  @Output() close = new EventEmitter<void>()

  @ViewChild('f', { static: false }) registerForm: NgForm;
  authToken: string

  constructor(
    public http: HttpClient,
    private toastr: ToastrService,
    private notify: NotificationService,
    private tokenService: TokenService) { }

  ngOnInit(): void {
    this.authToken = 'Bearer ' + this.tokenService.retrieveToken()
  }

  onRegister(form: NgForm) {
    showLoading();
    const file = document.getElementById("photo_image")["files"][0]
    var reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onloadend = (e) => {
      form.value.photo_image = btoa(reader.result.toString());
      this.http.post('http://127.0.0.1:8000/employee-registration',
        JSON.stringify(form.value),
        { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.authToken }) }
      ).subscribe(
        result => {
          hideLoading();
          this.notify.showSuccess('New employee saved successfully.', 'Success')
          this.onClose()
        },
        error => {
          hideLoading();
          this.notify.showError('Error encountered while saving.', 'Failure')
        })
    };
    reader.onerror = (e) => {
      hideLoading();
      this.notify.showError('Error encountered while saving.', 'Failure')
    };
  }

  onClose() {
    this.close.emit()
  }
}


