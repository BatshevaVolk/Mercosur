import { Component, Input, ViewChild } from '@angular/core';
import Handsontable from 'handsontable';

@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.component.html',
  styleUrls: ['./form-details.component.scss']
})
export class FormDetailsComponent {
  @ViewChild("handsontable", { static: false }) handsontable;
  @Input() data
  save() {
    let descriptionOfGoods = []
    let dataToSave = this.handsontable.hotInstance.getData();

    if (dataToSave != undefined) {
      dataToSave.forEach((d, index) => {
        if (!this.handsontable.hotInstance.isEmptyRow(index)) {
          descriptionOfGoods.push({
            tariffItemNumber: d[0],
            originCriteria: d[1],
            description: {
              a: d[2],
              b: d[3]
            },
            measure: d[4]
          });
        }
      });
    };
    return descriptionOfGoods;
  }
  //  afterChange(e: any) {
  //   // tslint:disable-next-line:no-console
  //   console.log(e);
  // }

  //  afterOnCellMouseDown(e: any) {
  //   // tslint:disable-next-line:no-console
  //   console.log(e);
  // }

}
