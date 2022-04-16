import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../notification.service';
import { TokenService } from '../auth/token.service';
import { hideLoading, showLoading } from '../app.component';
import { EmployeeService } from '../employee-details/employee.services';

@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.css']
})

export class RegisterEmployeeComponent implements OnInit {

  @Input() employeeSelected: any
  @Input() addOrEdit: any
  @Output() close = new EventEmitter<void>()
  @ViewChild('f', { static: false }) registerForm: NgForm;
  authToken: string;
  employeeRegisterForm: FormGroup;

  constructor(
    public http: HttpClient,
    private toastr: ToastrService,
    private notify: NotificationService,
    private tokenService: TokenService,
    private empService: EmployeeService,
  ) { }

  ngOnInit(): void {
    this.authToken = 'Bearer ' + this.tokenService.retrieveToken()
    this.initForm()
    // console.log('EMPLOYEE: ', this.employeeSelected)
    // console.log('Add or Edit: ', this.addOrEdit)
    // console.log('ID: ', this.employeeSelected.id)
  }

  private initForm() {
    if (this.addOrEdit) {
      this.employeeRegisterForm = new FormGroup({
        'name': new FormControl(this.employeeSelected.name, [Validators.required, Validators.maxLength(100)]),
        'gender': new FormControl(this.employeeSelected.gender, Validators.required),
        'blood_group': new FormControl(this.employeeSelected.blood_group),
        'dateOfBirth': new FormControl(this.employeeSelected.dateOfBirth, Validators.required),
        'highest_Qualification': new FormControl(this.employeeSelected.highest_Qualification, [Validators.required, Validators.maxLength(200)]),
        'pan': new FormControl(this.employeeSelected.pan, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
        'aadhar': new FormControl(this.employeeSelected.aadhar, [Validators.required, Validators.maxLength(12)]),
        'passport': new FormControl(this.employeeSelected.passport, Validators.maxLength(10)),
        'phone_number': new FormControl(this.employeeSelected.phone_number, [Validators.required, Validators.maxLength(10)]),
        'emergency_contact_number': new FormControl(this.employeeSelected.emergency_contact_number, [Validators.required, Validators.maxLength(10)]),
        'email': new FormControl(this.employeeSelected.email, [Validators.required, Validators.email]),
        'personal_email': new FormControl(this.employeeSelected.personal_email, [Validators.required, Validators.email]),
        'bank_account': new FormControl(this.employeeSelected.bank_account),
        'address': new FormControl(this.employeeSelected.address, [Validators.required, Validators.maxLength(500)]),
        'nationality': new FormControl(this.employeeSelected.nationality, Validators.required),
        'state': new FormControl(this.employeeSelected.state, Validators.required),
        'city': new FormControl(this.employeeSelected.city, Validators.required),
        'pin_code': new FormControl(this.employeeSelected.pin_code, [Validators.required, Validators.maxLength(6)]),
        'department': new FormControl(this.employeeSelected.department),
        'reporting': new FormControl(this.employeeSelected.reporting),
        'grade': new FormControl(this.employeeSelected.grade),
        'designation': new FormControl(this.employeeSelected.designation),
        'joining_date': new FormControl(this.employeeSelected.joining_date, Validators.required),
        'last_working_date': new FormControl(this.employeeSelected.last_working_date),
        'photo_image': new FormControl(null),
        // 'photo_image': new FormControl(this.employeeSelected.photo_image),
        'documents': new FormControl(null),
        'flexSwitchCheckChecked': new FormControl(this.employeeSelected.flexSwitchCheckChecked),
      })
    }
    else {
      this.employeeRegisterForm = new FormGroup({
        'name': new FormControl(null, [Validators.required, Validators.maxLength(100)]),
        'gender': new FormControl(null, Validators.required),
        'blood_group': new FormControl(null),
        'dateOfBirth': new FormControl(null, Validators.required),
        'highest_Qualification': new FormControl(null, [Validators.required, Validators.maxLength(200)]),
        'pan': new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
        'aadhar': new FormControl(null, [Validators.required, Validators.maxLength(12)]),
        'passport': new FormControl(null, Validators.maxLength(10)),
        'phone_number': new FormControl(null, [Validators.required, Validators.maxLength(10)]),
        'emergency_contact_number': new FormControl(null, [Validators.required, Validators.maxLength(10)]),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'personal_email': new FormControl(null, [Validators.required, Validators.email]),
        'bank_account': new FormControl(null),
        'address': new FormControl(null, [Validators.required, Validators.maxLength(500)]),
        'nationality': new FormControl(null, Validators.required),
        'state': new FormControl(null, Validators.required),
        'city': new FormControl(null, Validators.required),
        'pin_code': new FormControl(null, [Validators.required, Validators.maxLength(6)]),
        'department': new FormControl(null),
        'reporting': new FormControl(null),
        'grade': new FormControl(null),
        'designation': new FormControl(null),
        'joining_date': new FormControl(null, Validators.required),
        'last_working_date': new FormControl(null),
        'photo_image': new FormControl(null),
        'documents': new FormControl(null),
        'flexSwitchCheckChecked': new FormControl(null),
      })
    }

  }

  onRegister() {
    showLoading();
    var reader = new FileReader();
    if (this.employeeRegisterForm.value.photo_image) {
      const file = document.getElementById("photo_image")["files"][0]
      reader.readAsBinaryString(file);
    }
    reader.onloadend = (e) => {
      this.employeeRegisterForm.value.photo_image = btoa(reader.result.toString());
      if (!this.addOrEdit) {
        this.empService.registerEmployee(JSON.stringify(this.employeeRegisterForm.value))
          .subscribe(
            result => {
              hideLoading();
              this.notify.showSuccess('New employee saved successfully.', 'Success')
              this.onClose()
            },
            error => {
              hideLoading();
              this.notify.showError('Error encountered while saving.', 'Failure')
            })
      }
      else {
        this.empService.updateEmployeeDetails(this.employeeSelected.id, JSON.stringify(this.employeeRegisterForm.value))
          .subscribe(
            result => {
              hideLoading();
              this.notify.showSuccess('Employee Data was updated successfully.', 'Success')
              this.onClose()
            },
            error => {
              hideLoading();
              this.notify.showError('Error encountered while saving.', 'Failure')
            })
      }
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


