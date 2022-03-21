import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit, OnDestroy {
  @Input() employeeSelected: any
  @Output() close = new EventEmitter<void>()
  private id: string
  private paramSub: Subscription
  employeeImgURL: SafeResourceUrl
  // employee:{}

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.employeeImgURL = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64, ' + this.employeeSelected.photo_image)
  }

  ngOnDestroy(): void { }

  onClose() {
    this.close.emit()
  }

}
