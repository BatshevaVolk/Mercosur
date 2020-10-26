import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { ForgotPasswordComponent } from './components/user/forgot-password/forgot-password.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { NewUserComponent } from './components/user/new-user/new-user.component';
import { AuthService } from './services/auth.service';

const routes: Routes = [
{path: "login", component: LoginComponent },
  { path: "register-user", component: RegistrationComponent },
  { path: "forgot-password", component: ForgotPasswordComponent },
  { path: "new-user", component: NewUserComponent , canActivate: [AuthService]},
  { path: "main", component: MainComponent ,canActivate: [AuthService]},
  { path: "", component: MainComponent,canActivate: [AuthService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
