import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { LeaveService } from './leave-service';
import { NotificationService } from "../notification.service";
import { ToastrService } from 'ngx-toastr';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-leave-management',
  templateUrl: './leave-management.component.html',
  styleUrls: ['./leave-management.component.css']
})
export class LeaveManagementComponent implements OnInit {

  leave_balance: {}
  display_LeaveForm = false
  error: any = { isError: false, errorMessage: '' }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: []
  };

  constructor(
    private leaveService: LeaveService,
    private toastr: ToastrService,
    private notify: NotificationService,
  ) { }

  ngOnInit(): void {
    this.fetchLeaveBalance();
  }

  fetchLeaveBalance() {
    this.leaveService.display_Leave_Balance().subscribe(
      (data) => {
        console.log(data);
        this.leave_balance = data;
      });
  }

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }

  leaveApplication() {
    this.display_LeaveForm = true
  }

  onApplyLeave(form: NgForm) {
    form.value.leave_type = parseInt(form.value.leave_type)
    const leaveData = JSON.stringify(form.value)
    console.log('LEAVE DATA: ', leaveData)
    this.compareTwoDates(form)
    if (this.error.isError) {
      this.dateError()
      console.error(this.error.errorMessage)
    }
    else {
      this.leaveService.leave_application(leaveData)
        .subscribe(
          () => {
            this.fetchLeaveBalance()
            this.notify.showSuccess('Leave was applied', 'Success!!')
          })
    }
  }

  compareTwoDates(form) {
    this.error.isError = false
    if (new Date(form.controls['to_Date'].value) < new Date(form.controls['from_Date'].value)) {
      this.error = {
        isError: true,
        errorMessage: "End Date can't be before start date"
      };
    }
  }

  dateError() {
    this.notify.showError("Check the Dates again!!\n End Date can't be before start date", 'Error')
  }

  showToasterSuccess() {
    this.toastr.success("Data shown successfully !!")
  }

  showToasterError() {
    this.toastr.error("From Date should be before To Date!")
  }
}