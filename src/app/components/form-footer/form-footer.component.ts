import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-footer',
  templateUrl: './form-footer.component.html',
  styleUrls: ['./form-footer.component.scss']
})
export class FormFooterComponent implements OnInit {
  footerForm;
  _data: any;

  @Input() set data(value) {
    this._data = value;
    if (value != undefined) {
      this.footerForm.patchValue(value);
    }
  }
  get data(): any {
    if (this._data != undefined) {
      return this._data;
    }
    return {};
  }
  constructor() { }

  ngOnInit() {
    this.footerForm = new FormGroup({
      certificationAuthority: new FormControl("",Validators.required),
    });
  }

}
