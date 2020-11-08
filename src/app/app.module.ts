import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
//import { Observable } from 'rxjs/Observable'
import { HotTableModule } from '@handsontable/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmSnackBarComponent } from './components/confirm-snack-bar/confirm-snack-bar.component';
import { AddEmaillSnackBarComponent } from './components/add-emaill-snack-bar/add-emaill-snack-bar.component';
import { FormComponent } from './components/form/form.component';
import { MainComponent } from './components/main/main.component';
import { ForgotPasswordComponent } from './components/user/forgot-password/forgot-password.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { FormDetailsComponent } from './components/form-details/form-details.component';
import { NewUserComponent } from './components/user/new-user/new-user.component';
import { FormHeadersComponent } from './components/form-headers/form-headers.component';
import { FormFooterComponent } from './components/form-footer/form-footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { HttpClientModule } from "@angular/common/http";
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from "@angular/material";
import { ResetPasswordComponent } from './components/user/reset-password/reset-password.component';
@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    MainComponent,
    ForgotPasswordComponent,
    RegistrationComponent,
    ResetPasswordComponent,
    FormDetailsComponent,
    NewUserComponent,
    LoginComponent,
    FormHeadersComponent,
    FormFooterComponent,
    ConfirmSnackBarComponent,
    AddEmaillSnackBarComponent
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule ,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    //Observable,
    HotTableModule,
    HttpClientModule 
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmSnackBarComponent,
    AddEmaillSnackBarComponent
  ],
})
export class AppModule { }
