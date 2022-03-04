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

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: []
  };

  constructor(
    private leaveService: LeaveService
  ) { }

  ngOnInit(): void {
    this.leaveService.display_Leave_Balance().subscribe(
      (data) => {
        console.log(data)
        this.leave_balance = data
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
    this.leaveService.leave_application(leaveData)
  }
}
