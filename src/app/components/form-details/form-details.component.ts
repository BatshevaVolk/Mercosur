
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewChild, } from '@angular/core';
import { getMatFormFieldMissingControlError } from '@angular/material';
import Handsontable from 'handsontable';


@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.component.html',
  styleUrls: ['./form-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormDetailsComponent {
  show: boolean = false;
  @ViewChild("handsontable", { static: false }) handsontable;
  _data;
  lastChange;
  rows: string = "";

  constructor(private changeDetectorRef: ChangeDetectorRef) { }
  @Input() set data(value) {
    this._data = value;
    if (value != undefined) {
      // value.isProducer = value.isProducer === true ? "producer" : "exporter";
      // this.modifiedDate = (value.modifiedDate=="0001-01-01T00:00:00")?"":value.modifiedDate;
      // this.footerForm.patchValue(value);
    }
  }

  // afterChange(changes){
  //   console.log("ff");
  //   //debugger;
  // }
  get data(): any {
    if (this._data != undefined) {
      return this._data;
    }
    return {};
  }
  validator(value, callback): any {
    if ((this as any).prop == "tariffItemNumber") {
      if (value.length > 10) {
        (this as any).instance.setDataAtCell((this as any).row, (this as any).col, value.substring(0, 10), null);
      }
      callback(true)
    }
    if ((this as any).prop == "originCriteria") {
      if (value.length > 1) {
        (this as any).instance.setDataAtCell((this as any).row, (this as any).col, value.substring(0, 1), null);
      }
      callback(true)

    }
    if ((this as any).prop == "description") {
      if (value.length > 60) {
        (this as any).instance.setDataAtCell((this as any).row, (this as any).col, value.substring(0, 60), null);
        this.show = true;
        // this.cdRef.detectChanges();
        console.log(this.show)
      }
      callback(true)
    }
    if ((this as any).prop == "measure") {
      if (value.length > 15) {
        (this as any).instance.setDataAtCell((this as any).row, (this as any).col, value.substring(0, 15), null);
      }
      callback(true)
    }

  }
  // beforeChange(changes, source){
  //  console.log(changes) ;
  // }
  // beforeKeyDown(e) {
  // console.log("f");
  // }
  customContextMenu = {
    items: this.getItems()
  }
  getItems() {
    const comp = this;
    return {
      'row_above': { name: 'Insert row above' },
      'row_below': { name: 'Insert row below' },
      'remove_row': { name: 'Remove row' },
      'copy': { name: 'Copy' },
      'cut': { name: 'Cut' },
      'paste': {
        name: 'Paste',
        callback: function (key, options) {
          comp.paste(this, options, false);
        }
      },
      'paste_shift_cells_down': {
        name: 'Paste & Shift cells down',
        callback: function (key, options) {
          comp.paste(this, options, true);
        }
      }
    }
  }
  paste(coreObject, options, isShiftPaste) {
    const pasteOptions = options;
    const core = coreObject;
    (navigator as any).permissions.query({ name: "clipboard-read" }).then(result => {
      // If permission to read the clipboard is granted or if the user will
      // be prompted to allow it, we proceed.
      console.log("state");
      console.log(result.state);
      if (result.state == "granted" || result.state == "prompt") {
        navigator.clipboard.readText().then(
          (clipText) => {
            let data = [];
            clipText.split("\n").forEach(row => {
              if (row != "") {
                data.push(row.split("\t"))
              }
            });
            if (isShiftPaste) {
              core.alter("insert_row", pasteOptions[0].start.row, data.length);
            }
            for (var rowIndex = pasteOptions[0].start.row, dataRowIndex = 0; rowIndex < data.length + pasteOptions[0].start.row; rowIndex += 1, dataRowIndex++) {
              for (var columnIndex = pasteOptions[0].start.col, dataColumnIndex = 0; columnIndex < data[0].length + pasteOptions[0].start.col; columnIndex += 1, dataColumnIndex++) {
                core.setDataAtCell(rowIndex, columnIndex, data[dataRowIndex][dataColumnIndex])
              }
            }
          });
      }
    })
  }
  save() {
    let descriptionOfGoods = []
    let dataToSave = this.handsontable.hotInstance.getData();

    if (dataToSave != undefined) {
      dataToSave.forEach((d, index) => {
        if (!this.handsontable.hotInstance.isEmptyRow(index)) {
          descriptionOfGoods.push({
            tariffItemNumber: d[0],
            originCriteria: d[1],
            description: d[2],
            measure: d[3]
          });
        }
      });
    };
    return descriptionOfGoods;
  }

  onAfterValidate = (hotInstance, changes, source) => {

    if (changes.length > 60) {
      this.show = true;
      if (this.rows == "")
        this.rows = (source + 1);
      else
        this.rows = this.rows + ", " + (source + 1);
      this.changeDetectorRef.detectChanges();
      return true;
    }


    return true;
  }
}
