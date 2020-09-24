import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators,ReactiveFormsModule, FormBuilder } from '@angular/forms';

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
  constructor(private formbulider:FormBuilder ) { }
  toString(orgDetails){
  let newLine = "\n";
    return `${orgDetails.name}${newLine}${orgDetails.address}${newLine}${orgDetails.country}`
  }
  
  ngOnInit() {
    //let headers = [];
    this.headersForm = new FormGroup({

        exporter:new FormGroup({
          name:new FormControl("",Validators.required),
          address:new FormControl("",Validators.required),
          country:new FormControl("",Validators.required)}),
        importer:new FormGroup({
        name:new FormControl("",Validators.required),
          address:new FormControl("",Validators.required),
          country:new FormControl("",Validators.required)}),
      commercialInvoices:new FormControl("",Validators.required),
      observations:new FormControl("",Validators.required),
      countryOfDestination:new FormControl("",Validators.required),
      portAndTransportDetails:new FormGroup({
        port:new FormControl("",Validators.required),
        transport:new FormControl("",Validators.required),
      }),
      countryOfOrigin:new FormControl("",Validators.required),
      certificateNo:new FormControl("",Validators.required),
    });
  }
  
}
