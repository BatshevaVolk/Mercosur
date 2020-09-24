import {  Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.component.html',
  styleUrls: ['./form-details.component.scss']
})
export class FormDetailsComponent  {
  @Input() data: any[]=[] ;
  
  //  afterChange(e: any) {
  //   // tslint:disable-next-line:no-console
  //   console.log(e);
  // }

  //  afterOnCellMouseDown(e: any) {
  //   // tslint:disable-next-line:no-console
  //   console.log(e);
  // }
   
}
