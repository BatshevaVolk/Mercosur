import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private formService:FormService,private formbulider:FormBuilder) { }
  data:any={};
  searchForm:any={};
  
  ngOnInit() {
    this.searchForm = this.formbulider.group({
      fileNo: [""],
      mblNumber: [""],
      certificateNo: [""],
  });
}
  print(){
    window.print();
  }
  onFormSubmit(searchForm){
    this.formService.getCertificateForm(searchForm).subscribe(data => {
      this.data = data
    });
  }
}
