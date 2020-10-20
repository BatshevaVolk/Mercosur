
import { Component, Input, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { getMatFormFieldMissingControlError } from '@angular/material';
import Handsontable from 'handsontable';
const t: object = new Object();
@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.component.html',
  styleUrls: ['./form-details.component.scss']
})
export class FormDetailsComponent implements AfterViewInit {

  @ViewChild("handsontable", { static: false }) handsontable;
  @Input() data
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
  ngAfterViewInit() {
    this.handsontable.hotInstance.addHook('beforePaste', this.beforePaste);

  }
  //  afterChange(e: any) {
  //   // tslint:disable-next-line:no-console
  //   console.log(e);
  // }

  //  afterOnCellMouseDown(e: any) {
  //   // tslint:disable-next-line:no-console
  //   console.log(e);
  // }

  beforePaste(data, coords) {
    let core = Object(this);
    core.alter("insert_row", coords[0].startRow, data.length);
    coords = coords;
    // data -> [[1, 2, 3], [4, 5, 6]]
    //data.splice(0, 1);
    // data -> [[4, 5, 6]]
    // coords -> [{startRow: 0, startCol: 0, endRow: 1, endCol: 2}]
  }
}
