import { Injectable } from '@angular/core';
 import { MatSnackBar } from '@angular/material';

 import { Observable, throwError } from 'rxjs';
 import { catchError, tap,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private _snackBar:MatSnackBar
    ) { 

  }

  resolve(name,result):Observable<any>{
    return result.pipe(
      map((res: any) => res),
      tap(res => {
       // console.debug(`${name} Success`, res);
      }),
      catchError(err=>{return this.handleError(err)})
    );
    }

  handleError(error):Observable<never>{
    this._snackBar.open("שגיאת מערכת", error.message, {
      duration: 2000,
    });
    return throwError(error);
  }
}
