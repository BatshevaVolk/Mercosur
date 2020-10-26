import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { AppService } from "./app.service";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: "root",
})
export class FormService {
  readonly url = environment.url;
  constructor(
    private http: HttpClient,
    private appService: AppService
  ) { }

  getCertificateForm(searchForm): Observable<any> {
    //   //var token = "Bearer " + localStorage.getItem("token");
    //   const httpOptions = {
    //      headers: new HttpHeaders({
    //        "Content-Type": "application/json",
    // //       //Authorization: token,
    //     }),
    // };
    return this.appService.resolve('getCertificateForm', this.http.post<any>(this.url + "form/certificateForm", searchForm,this.appService.getHttpOptions()));
  }
  getTemplateForPDF(certificateForm): any {
    return this.appService.resolve('getTemplateForPDF', this.http.post(this.url + "form/getTemplateForPDF", certificateForm,{ headers: this.appService.getHttpOptions().headers, responseType: "blob" } ));
  }
  saveCertificateForm(certificateForm): Observable<any> {
    //   //var token = "Bearer " + localStorage.getItem("token");
    //   const httpOptions = {
    //      headers: new HttpHeaders({
    //        "Content-Type": "application/json",
    // //       //Authorization: token,
    //     }),
    // };
    return this.appService.resolve('saveCertificateForm', this.http.post<any>(this.url + "form/saveCertificateForm", certificateForm,this.appService.getHttpOptions()));
  }

  sendMailWithCertificateForm(certificateForm, addressList): Observable<any> {
    //   //var token = "Bearer " + localStorage.getItem("token");
    //   const httpOptions = {
    //      headers: new HttpHeaders({
    //        "Content-Type": "application/json",
    // //       //Authorization: token,
    //     }),
    // };
    return this.appService.resolve('sendMailWithCertificateForm', this.http.post<any>(this.url + "form/sendMailWithCertificateForm",
      {
        "certificateForm": certificateForm,
        "addressList": addressList
      },this.appService.getHttpOptions()
    ));
    }
  clear(): Observable<any> {
    //   //var token = "Bearer " + localStorage.getItem("token");
    //   const httpOptions = {
    //      headers: new HttpHeaders({
    //        "Content-Type": "application/json",
    // //       //Authorization: token,
    //     }),
    // };
    return this.appService.resolve('clear', this.http.get<any>(this.url + "form/clear",this.appService.getHttpOptions()));
  }
  searchAvailableCertificateForm(): Observable<any> {
    //   //var token = "Bearer " + localStorage.getItem("token");
    //   const httpOptions = {
    //      headers: new HttpHeaders({
    //        "Content-Type": "application/json",
    // //       //Authorization: token,
    //     }),
    // };
    return this.appService.resolve('searchAvailableCertificateForm', this.http.get<any>(this.url + "form/searchAvailableCertificateForm",this.appService.getHttpOptions()));
  }
}
