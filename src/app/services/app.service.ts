import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { UserLoginI } from '../Models/user-login.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  user: UserLoginI;
  constructor(
    private _snackBar: MatSnackBar
  ) {

  }

  resolve(name, result): Observable<any> {
    return result.pipe(
      map((res: any) => res),
      tap(res => {
        // console.debug(`${name} Success`, res);
      }),
      catchError(err => { return this.handleError(err) })
    );
  }

  handleError(error): Observable<never> {
    this._snackBar.open("שגיאת מערכת", error.message, {
      duration: 2000,
    });
    return throwError(error);
  }
  getHttpOptions(): any {
    let token = "Bearer " + this.user.token;
    let httpOptions = {};
   
      httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: token,
        }),
      };
    return httpOptions;
  }
}
