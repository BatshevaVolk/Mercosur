import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-headers',
  templateUrl: './form-headers.component.html',
  styleUrls: ['./form-headers.component.scss']
})
export class FormHeadersComponent implements OnInit {
  headersForm;
  _data: any;

  @Input() set data(value) {
    this._data = value;
    if (value != undefined) {
      //debugger;
      //this.headersForm.controls["portAndTransportDetails"]=new FormArray(value.portAndTransportDetails);
      this.headersForm.patchValue(value);
      // this.headersForm.controls["portAndTransportDetails"]=this.formbulider.array(value.portAndTransportDetails);
      //this.headersForm.controls["exporter"].setValue(this.toString(value.exporter));
      // this.headersForm.controls["importer"].setValue(this.toString(value.importer));
    }
  }
  get data(): any {
    if (this._data != undefined) {
      return this._data;
    }
    return {};
  }
  constructor() { }
  // toString(orgDetails) {
  //   let newLine = "\n";
  //   return `${orgDetails.name}${newLine}${orgDetails.address}${newLine}${orgDetails.country}`
  // }

  ngOnInit() {
    //let headers = [];
    this.headersForm = new FormGroup({
      exporter: new FormGroup({
        a: new FormControl("", /*Validators.required*/),
        b: new FormControl("", /*Validators.required*/),
        c: new FormControl("", /*Validators.required*/),
        d: new FormControl("", /*Validators.required*/),
        e: new FormControl("", /*Validators.required*/)
      }),
      importer: new FormGroup({
        a: new FormControl("", /*Validators.required*/),
        b: new FormControl("", /*Validators.required*/),
        c: new FormControl("", /*Validators.required*/),
        d: new FormControl("", /*Validators.required*/),
        e: new FormControl("", /*Validators.required*/)
      }),
      commercialInvoices: new FormControl("",  /*Validators.required*/),
      observations: new FormControl(""),
      countryOfDestination: new FormControl("",  /*Validators.required*/),
      portAndTransportDetails: new FormGroup({
        port: new FormControl("",  /*Validators.required*/),
        transport: new FormControl("",  Validators.required),
      }),
      countryOfOrigin: new FormControl("",  /*Validators.required*/),
      certificateNo: new FormControl("", /* Validators.required*/),
    });
  }
  save() {
    this.headersForm.markAllAsTouched();
    if (this.headersForm.valid) {
      return {
        exporter: {
          a: this.headersForm.value.exporter.a.trim(),
          b: this.headersForm.value.exporter.b.trim(),
          c: this.headersForm.value.exporter.c.trim(),
          d: this.headersForm.value.exporter.d.trim(),
          e: this.headersForm.value.exporter.e.trim()
        },
        certificateNo: this.headersForm.value.certificateNo,
        importer: {
          a: this.headersForm.value.importer.a.trim(),
          b: this.headersForm.value.importer.b.trim(),
          c: this.headersForm.value.importer.c.trim(),
          d: this.headersForm.value.importer.d.trim(),
          e: this.headersForm.value.importer.e.trim()
        },
        countryOfOrigin: this.headersForm.value.countryOfOrigin,
        portAndTransportDetails: {
          port: this.headersForm.value.portAndTransportDetails.port,
          transport: this.headersForm.value.portAndTransportDetails.transport
        },
        countryOfDestination: this.headersForm.value.countryOfDestination,
        observations: this.headersForm.value.observations,
        commercialInvoices: this.headersForm.value.commercialInvoices,
      }

    }
    return undefined;
  }
}
