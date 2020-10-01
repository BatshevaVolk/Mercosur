import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormDetailsComponent } from '../form-details/form-details.component';
import { FormFooterComponent } from '../form-footer/form-footer.component';
import { FormHeadersComponent } from '../form-headers/form-headers.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() data: any = {};
  @ViewChild(FormHeadersComponent, { static: false }) header
  @ViewChild(FormDetailsComponent, { static: false }) details
  @ViewChild(FormFooterComponent, { static: false }) footer
  constructor() { }

  ngOnInit() {

  }
  public save() {
    let headerData = this.header.save()
    let detailsData = this.details.save()
    let footerData = this.footer.save()
    let certificateForm;
    if (headerData != undefined && footerData != undefined) {
      certificateForm = {
        id: this.data.id,
        fileNo: this.data.fileNo,
        mblNumber: this.data.mblNumber,
        header: headerData,
        descriptionOfGoods: detailsData,
        footer: footerData
      };
    }
    return certificateForm;
  }

}
