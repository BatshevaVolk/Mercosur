import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { ResetPasswordI } from 'src/app/Models/reset-password.model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordModel: ResetPasswordI;
  resetPasswordForm: any;
  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private formbulider: FormBuilder

  ) { }

  ngOnInit() {
    this.resetPasswordModel = {
      token: this.route.snapshot.paramMap.get('code'),
      userId: this.route.snapshot.paramMap.get('userId'),
      password: "",
      confirmPassword: ""
    }
    this.resetPasswordForm = this.formbulider.group({
      userId: [this.resetPasswordModel.userId, [Validators.required]],
      token: [this.resetPasswordModel.token, [Validators.required]],
      password: [this.resetPasswordModel.password, [Validators.required]],
      confirmPassword: [this.resetPasswordModel.confirmPassword, [Validators.required]],
    });
  }

  onFormSubmit(form: any) {

    this.authService.resetPassword(form).subscribe((data: any) => {
      this.router.navigateByUrl("/login");
      this._snackBar.open(
        "היכנס למערכת באמצעות הסיסמה החדשה",
        "סיסמתך אופסה בהצלחה",
        {
          duration: 2000,
        }
      );
    }, (error) => {
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