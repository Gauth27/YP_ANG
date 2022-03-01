import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  is_admin: boolean
  constructor() { }

  ngOnInit(): void {
    this.is_admin = JSON.parse(localStorage.getItem("ADMIN"))
  }

}
