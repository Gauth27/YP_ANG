import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { LeaveService } from './leave-service';

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
    private leaveService: LeaveService
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
      this.leaveService.dateError()
      console.error(this.error.errorMessage)
    }
    else {
      this.leaveService.leave_application(leaveData)
      // this.fetchLeaveBalance()
      this.ngOnInit()
    }
  }


  compareTwoDates(form) {
    this.error.isError = false
    if (new Date(form.controls['to_Date'].value) < new Date(form.controls['from_Date'].value)) {
      this.error = {
        isError: true,
        errorMessage: "End Date can't before start date"
      };
    }
  }
}



