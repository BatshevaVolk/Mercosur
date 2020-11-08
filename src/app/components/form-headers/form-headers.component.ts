import { Component, Input, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

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
      this.headersForm.patchValue(value);
    }
  }
  get data(): any {
    if (this._data != undefined) {
      return this._data;
    }
    return {};
  }
  constructor(private _snackBar:MatSnackBar) { }

  ngOnInit() {
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
    else{
      this._snackBar.open("למסמך B/L יש למלא", "שגיאה", {
        duration: 2000,
      });
    return undefined;
    }
  }
}
