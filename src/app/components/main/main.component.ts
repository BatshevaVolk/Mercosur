import { Component, OnInit, ViewChild } from '@angular/core';
import { FormService } from 'src/app/services/form.service';
import { FormControl } from '@angular/forms';


import { MatAutocomplete, MatSnackBar } from '@angular/material';
import { FormComponent } from '../form/form.component';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private formService: FormService, private _snackBar: MatSnackBar) { }
  @ViewChild(MatAutocomplete, { static: false }) matAutocomplete
  @ViewChild(FormComponent, { static: false }) form

  data: any = {};
  searchForm = new FormControl();
  filteredForms: any;
  availableCertificateForm: any[] = []
  currentdata
  //isLoading = false;
  showProgress = false;
  errorMsg: string;

  searchAvailableCertificateForm() {
    this.formService.searchAvailableCertificateForm().subscribe(data => {
      if (data == undefined) {
        this.errorMsg = "";
        this.availableCertificateForm = [];
      } else {
        this.errorMsg = "";
        this.availableCertificateForm = data;
      }
    });
  }
  ngOnInit() {
    this.searchAvailableCertificateForm();

    // this.searchForm.valueChanges
    // .pipe(
    //   debounceTime(500),
    //   tap(() => {
    //     this.errorMsg = "";
    //     this.filteredForms = [];
    //     this.isLoading = true;
    //   }),
    //   switchMap(value => this.applyFilter(value)
    //     .pipe(
    //       finalize(() => {
    //       //  this.isLoading = false
    //       }),
    //     )
    //   )
    // )
    // .subscribe(data=> {

    //   if (data == undefined) {
    //     this.errorMsg = "";
    //     this.filteredForms = [];
    //   } else {
    //     this.errorMsg = "";
    //     this.filteredForms = data;
    //     this.isLoading = false
    //   }
    // });
  }

  applyFilter(value) {
    //return new Observable(obs => {
    if (!value) {
      this.currentdata = this.availableCertificateForm;
      //  obs.next(this.availableCertificateForm);
      //obs.complete();
    }
    else {
      this.currentdata = this.availableCertificateForm.filter(
        (item) => item.fileNo.toLowerCase().indexOf(value.toLowerCase()) > -1 || item.mblNumber.toLowerCase().indexOf(value.toLowerCase()) > -1 || item.certificateNo.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      //obs.next(this.filteredForms.slice(0,10));
    }
    //});
    this.filteredForms = this.currentdata.slice(0, 10);
    if (this.matAutocomplete.panel != undefined) {
      this.matAutocomplete.panel.nativeElement.onscroll = (e) => {
        if (e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop < 5) {
          var scrollPos = e.target.scrollTop;
          var newData = this.currentdata.slice(this.filteredForms.length, this.filteredForms.length + 10);
          if (newData.length < 1) {
            return;
          }
          newData.forEach((item) => {
            this.filteredForms.push(item);
          });
          e.target.scrollTop = scrollPos;
        }
      };
    }
  }
  print() {
    window.print();
  }
  // displayFn(element) {
  //   // I want to get the full object and display the name
  //   if (element == undefined) return '';
  //   return `File No.: ${element.fileNo} | MBL Number: ${element.mblNumber}`;
  // }
  save() {
    this.showProgress = true;
    let certificateForm = this.form.save();
    if (certificateForm != undefined) {
      this.formService.saveCertificateForm(certificateForm).subscribe(result => {
        this.showProgress = false;
        if (result > 0) {
          this._snackBar.open("הנתונים נשמרו בהצלחה", "שמירת טופס", {
            duration: 2000,
          });
          this.data.id = result;

          // this.searchAvailableCertificateForm();
        }
        else {
          this._snackBar.open("נסה שנית", "שגיאה", {
            duration: 2000,
          });
        }
      });
    }
    else {
      this.showProgress = false;

    }
  }
  getCertificateForm(searchForm) {
    this.formService.getCertificateForm(searchForm).subscribe(data => {
      this.data = data;
    });
  }
}
