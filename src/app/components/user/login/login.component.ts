import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  getYear = new Date().getFullYear();
  formModel = {
    Email: "",
    Password: "",
  };
  constructor(
    private service: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if (localStorage.getItem("token") != null)
      this.router.navigateByUrl("/main");
  }

  onSubmit(form: NgForm) {
    this.service.login(form.value);
  }
}
