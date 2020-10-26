import { Component, OnInit } from "@angular/core";
import { RegisterI } from "src/app/Models/user-register.model";
import { AuthService } from "src/app/services/auth.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { duration } from "moment";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"],
})
export class RegistrationComponent implements OnInit {
  user: RegisterI;

  constructor(
    private service: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) form.reset();
    this.user = {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      mobilePhone: "",
      orgId: "",
    };
  }

  OnSubmit(form: NgForm) {
    this.service.register(form.value).subscribe((data: any) => {
      if (data) {
        this._snackBar.open(
          "ההרשמה בוצעה בהצלחה, אנא פנה למנהל המערכת להתחברות ראשונית",
          "סגור",
          { duration: 10000 }
        );
        this.resetForm(form);
        this.router.navigateByUrl("/login");
      } else
        this._snackBar.open(
          "בעיה בעת ההרשמה",
          "אנא נסה שוב או פנה למנהל המערכת",
          {
            duration: 2000,
          }
        );
    });
  }
}
