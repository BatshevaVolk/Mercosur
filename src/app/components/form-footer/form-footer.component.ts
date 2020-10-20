import { Component, Input, OnInit, ViewChild, ɵɵstaticViewQuery } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-footer',
  templateUrl: './form-footer.component.html',
  styleUrls: ['./form-footer.component.scss']
})
export class FormFooterComponent implements OnInit {
  footerForm;
  _data: any;
modifiedDate='';
  @Input() set data(value) {
    this._data = value;
    if (value != undefined) {
      value.isProducer = value.isProducer === true ? "producer" : "exporter";
      this.modifiedDate = (value.modifiedDate=="0001-01-01T00:00:00")?"":value.modifiedDate;
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
      certificationAuthority: new FormControl("", Validators.required),
      isProducer: new FormControl("producer", Validators.required),
      stampAndSignature:new FormControl("", Validators.required),
    });
  }
  save() {
  //  if (this.footerForm.valid) {
      return {
        certificationAuthority: this.footerForm.value.certificationAuthority,
        isProducer: this.footerForm.value.isProducer === "producer" ? true : false
      }
   // }
   // return undefined;
  }

}
