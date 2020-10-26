import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],

})
export class ForgotPasswordComponent implements OnInit {
  email: any=""
  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router
  ){}
  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) form.reset();
    this.email="";
  }

  OnSubmit() {
    this.authService.sendPasswordResetEmail(this.email).subscribe( (data:any)=> {
    this.router.navigateByUrl("/login");
     this._snackBar.open(
      "מייל שמכיל לינק להשלמת איפוס סיסמה נשלח לכתובת המייל שלך",
      "אנא השלם את התהליך לפני שתבצע לוגין",
      {
        duration: 2000,
      }
    );
    },  (error)=> {
      console.log(error);
      this._snackBar.open(
        "אנא נסה שוב או פנה למנהל המערכת",
        "בעיה בעת איפוס סיסמה",
        {
          duration: 2000,
        }
      );
    });
  }
}
