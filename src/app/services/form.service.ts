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
    return this.appService.resolve('getCertificateForm', this.http.post<any>(this.url + "/form/certificateForm", searchForm));
  }

  saveCertificateForm(certificateForm): Observable<any> {
    //   //var token = "Bearer " + localStorage.getItem("token");
    //   const httpOptions = {
    //      headers: new HttpHeaders({
    //        "Content-Type": "application/json",
    // //       //Authorization: token,
    //     }),
    // };
    return this.appService.resolve('saveCertificateForm', this.http.post<any>(this.url + "/form/saveCertificateForm", certificateForm));
  }

  sendMailWithCertificateForm(certificateForm, addressList): Observable<any> {
    //   //var token = "Bearer " + localStorage.getItem("token");
    //   const httpOptions = {
    //      headers: new HttpHeaders({
    //        "Content-Type": "application/json",
    // //       //Authorization: token,
    //     }),
    // };
    return this.appService.resolve('sendMailWithCertificateForm', this.http.post<any>(this.url + "/form/sendMailWithCertificateForm",
      {
        "certificateForm": certificateForm,
        "addressList": addressList
      }
    ));
  }



  getTemplateForPDF(certificateForm): any {
    const httpOptions = {
      headers: new HttpHeaders({
        responseType: "blob",
      }),
    };
    var routePath = this.url + "/form/getTemplateForPDF";
    return this.appService.resolve('getTemplateForPDF', this.http
      .post(routePath, certificateForm, { headers: httpOptions.headers, responseType: "blob" }));
  }
  clear(): Observable<any> {
    //   //var token = "Bearer " + localStorage.getItem("token");
    //   const httpOptions = {
    //      headers: new HttpHeaders({
    //        "Content-Type": "application/json",
    // //       //Authorization: token,
    //     }),
    // };
    return this.appService.resolve('clear', this.http.get<any>(this.url + "/form/clear"));
  }
  searchAvailableCertificateForm(): Observable<any> {
    //   //var token = "Bearer " + localStorage.getItem("token");
    //   const httpOptions = {
    //      headers: new HttpHeaders({
    //        "Content-Type": "application/json",
    // //       //Authorization: token,
    //     }),
    // };
    return this.appService.resolve('searchAvailableCertificateForm', this.http.get<any>(this.url + "/form/searchAvailableCertificateForm"));
  }
}
