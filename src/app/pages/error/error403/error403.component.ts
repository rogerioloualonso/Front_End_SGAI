import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error403',
  templateUrl: './error403.component.html'
})
export class Error403Component implements OnInit {

  constructor() { }

  ngOnInit() {

    sessionStorage.setItem('timeOut', null);
    sessionStorage.clear();

  }

}
