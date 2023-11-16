import { Component, OnInit, OnChanges } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  showPage: boolean = false;
  logo: any;

  constructor(
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.showSpinner();
  }

  showSpinner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2500);
  }
}
