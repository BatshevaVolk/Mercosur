import { Injectable, Output, EventEmitter } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';
import {
  ActivatedRoute,
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { AppService } from "./app.service";
import { MatSnackBar } from "@angular/material";
import { UserLoginI } from "../Models/user-login.model"

const ELBIT_ID: string = "36540e93-8d8a-47d2-b65d-c89839d80560"
@Injectable({
  providedIn: "root",
})
export class AuthService implements CanActivate {
  readonly BaseURI = environment.url;
  @Output() onCustomerLoggedIn: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private appService: AppService,
  ) { }
  canActivate(activeRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (activeRoute.routeConfig.path === "new-user" && this.appService.user.token) {
      return true;
    }
    if (this.appService.user.token && this.appService.user.role && this.appService.user.orgName) {
      // logged in so return true
      return true;
    }
    if (this.appService.user.token) {
      this.router.navigate(["/new-user"]);
      return false;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(["/login"]);
    return false;
  }
  formModel = this.fb.group({
    UserName: ["", Validators.required],
    Email: ["", Validators.email],
    FullName: [""],
    Passwords: this.fb.group(
      {
        Password: ["", [Validators.required, Validators.minLength(4)]],
        ConfirmPassword: ["", Validators.required],
      },
      { validator: this.comparePasswords }
    ),
  });

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get("ConfirmPassword");
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (
      confirmPswrdCtrl.errors == null ||
      "passwordMismatch" in confirmPswrdCtrl.errors
    ) {
      if (fb.get("Password").value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else confirmPswrdCtrl.setErrors(null);
    }
  }

  register(user: any) {
    var reqHeader = new HttpHeaders({ "No-Auth": "True" });
    return this.http.post(this.BaseURI + "Account/_signup", user, {
      headers: reqHeader,
    });
  }

  sendPasswordResetEmail(email: string) {
    var reqHeader = new HttpHeaders({ "No-Auth": "True" });
    return this.http.get(this.BaseURI + "Account/sendPasswordResetEmail/" + email, {
      headers: reqHeader,
    });
  }

  resetPassword(data: any) {
    var reqHeader = new HttpHeaders({ "No-Auth": "True" });
    return this.http.post(this.BaseURI + "Account/_resetpassword", data, {
      headers: reqHeader,
    });
  }

  login(formData) {
    var data = this.http.post(this.BaseURI + "token", formData);
    data.subscribe(

      (res: any) => {
        localStorage.setItem("userId", res.userId);
        localStorage.setItem("token", res.token);
        if (res.role) {
          localStorage.setItem("role", res.role);
        }
        localStorage.setItem("fullName", res.fullName);
        if (res.orgName) {
          localStorage.setItem("orgName", res.orgName);
        }
        this.appService.user = new UserLoginI();
          this.router.navigateByUrl("/main");
          this._snackBar.open(" שלום " + this.appService.user.fullName, "התחברת בהצלחה", {
            duration: 2000,
          });

        // window.location.reload();
      },
      (err) => {
        if (err.status == 401)
          this._snackBar.open("שם משתמש ו/או סיסמה שגויים", "לא ניתן להתחבר", {
            duration: 2000,
          });
        else console.log(err);
      }
    );
  }
  SetGloabl
  LogOut() {
    this.appService.user.clear();
    this.appService.user = new UserLoginI();
    this.router.navigate(["/login"]);
  }
}