import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  @Input() employeeSelected: any
  @Output() close = new EventEmitter<void>()
  constructor() { }

  ngOnInit(): void {
    console.log("Edit Details: ", this.employeeSelected)
  }

  onClose() {
    this.close.emit()
  }
}
