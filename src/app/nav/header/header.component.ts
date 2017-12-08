import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() onDarkMode = new EventEmitter<boolean>();
  darkMode = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  setMode() {
    this.darkMode = this.darkMode ? false : true;

    this.onDarkMode.emit(this.darkMode);
  }

  goHome() {
    this.router.navigate(['home']);
  }
}
