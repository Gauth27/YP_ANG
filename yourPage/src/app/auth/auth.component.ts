import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { showLoading } from '../app.component';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(
    private navRoute: Router,
    private authService: AuthService,
    private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    showLoading();
    const loginCredentials = JSON.stringify(form.value)
    this.authService.onLogin(loginCredentials)
    // form.reset()
  }
}
