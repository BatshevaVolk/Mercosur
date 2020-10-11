import { Component,Inject } from '@angular/core';
import {  MatSnackBar , MatSnackBarConfig, MAT_SNACK_BAR_DATA, MatSnackBarRef } from "@angular/material";

@Component({
  selector: 'app-confirm-snack-bar',
  templateUrl: './confirm-snack-bar.component.html',
  styleUrls: ['./confirm-snack-bar.component.scss']
})
export class ConfirmSnackBarComponent {

  constructor  ( 
    public snackBarRef: MatSnackBarRef<ConfirmSnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any) { }
   
}

