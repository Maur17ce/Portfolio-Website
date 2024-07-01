import { Injectable } from '@angular/core';
import { ConfigService } from '@services/config.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertType, StandardResponse } from '@interfaces/web';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class WebService {
  public constructor(
    private readonly confSrv: ConfigService,
    private readonly http: HttpClient,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
  ) {}

  public get<T>(url: string, options?: object, alertType: AlertType = 'ERROR'): Observable<StandardResponse<T>> {
    return this.http.get<StandardResponse<T>>(this.confSrv.config?.api + url, options).pipe(
      tap((res) => {
        this.openAlert(res, alertType);
      }),
      catchError((err) => {
        return this.handleInternalErrors(err);
      }),
    );
  }

  public post<T>(
    url: string,
    body?: unknown,
    options?: object,
    alertType: AlertType = 'ERROR',
  ): Observable<StandardResponse<T>> {
    return this.http.post<StandardResponse<T>>(this.confSrv.config?.api + url, body, options).pipe(
      tap((res) => {
        this.openAlert(res, alertType);
      }),
      catchError((err) => {
        return this.handleInternalErrors(err);
      }),
    );
  }

  public delete<T>(url: string, options?: object, alertType: AlertType = 'ERROR'): Observable<StandardResponse<T>> {
    return this.http.delete<StandardResponse<T>>(this.confSrv.config?.api + url, options).pipe(
      tap((res) => {
        this.openAlert(res, alertType);
      }),
      catchError((err) => this.handleInternalErrors(err)),
    );
  }

  private handleInternalErrors = (err: HttpErrorResponse) => {
    if (err.status === 401) {
      sessionStorage.removeItem('app.token');
    }
    return throwError(err);
  };

  private openAlert<T>(res: StandardResponse<T>, type: AlertType) {
    if (type !== 'NONE') {
      switch (type) {
        case 'ALL':
          this.openSnackbar(res);
          break;
        case 'OK':
          if (res.statusCode === 'OK') {
            this.openSnackbar(res);
          }
          break;
        case 'ERROR':
          if (res.statusCode === 'ERROR') {
            this.openSnackbar(res);
          }
          break;
        case 'INFO':
          if (res.statusCode === 'INFO') {
            this.openSnackbar(res);
          }
          break;
      }
    }
  }

  private openSnackbar<T>(res: StandardResponse<T>) {
    this.snackBar.open(res.statusMessage, 'OK', { duration: 5000 });
  }
}
