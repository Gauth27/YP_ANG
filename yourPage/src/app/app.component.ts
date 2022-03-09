import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'yourPage';
}

export function showLoading() {
  document.getElementById("loading").style.display = "flex";
}

export function hideLoading() {
  document.getElementById("loading").style.display = "none";
}
