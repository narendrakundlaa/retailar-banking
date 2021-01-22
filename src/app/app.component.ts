import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLogin: boolean;
  title = 'app';
  ngOnInit() {
    const test = JSON.parse(localStorage.getItem('test'));
    this.isLogin = test;
  }
  logOff() {
    localStorage.removeItem('test');
    localStorage.clear();
  }
}
