import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit, OnDestroy {
  @Input() employeeSelected: {}
  @Output() close = new EventEmitter<void>()
  private id: string
  private paramSub: Subscription
  // employee:{}

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient) { }

  ngOnInit(): void { }

  ngOnDestroy(): void { }

  onClose() {
    this.close.emit()
  }

}
