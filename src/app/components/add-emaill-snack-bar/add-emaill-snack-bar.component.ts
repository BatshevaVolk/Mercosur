import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig, MAT_SNACK_BAR_DATA, MatSnackBarRef } from "@angular/material";

@Component({
  selector: 'app-add-emaill-snack-bar',
  templateUrl: './add-emaill-snack-bar.component.html',
  styleUrls: ['./add-emaill-snack-bar.component.scss']
})
export class AddEmaillSnackBarComponent implements OnInit {
  addressList = [];


  constructor(private formbulider: FormBuilder,
    public snackBarRef: MatSnackBarRef<AddEmaillSnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any,) { }
  addressListForm;
  ngOnInit() {
    this.addressListForm = this.formbulider.group({
      list: this.formbulider.group({
        email0: new FormControl(''),
      }),
    });
  }


  addAddress() {
    let key = `email${Object.keys(this.addressListForm.controls["list"].controls).length}`;
    this.addressListForm.controls["list"].addControl(key, new FormControl(""));
  }
  send() {
    this.addressList = [];
    Object.entries(this.addressListForm.controls["list"].controls).forEach(([key, control]: [string, any]) => {
      if (control.value != undefined && control.value!.trim() != "") {
        this.addressList.push(control.value);
      }
    });

    this.snackBarRef.dismissWithAction()
  }
}

