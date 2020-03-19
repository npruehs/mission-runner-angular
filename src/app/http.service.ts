import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, Subject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LoggerService, LogLevel } from './logger.service';

@Injectable()
export class HttpService {
  private hasErrorSubject = new Subject<boolean>();
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private hasError = this.hasErrorSubject.asObservable();

  constructor(
    private http: HttpClient,
    private logger: LoggerService
  ) {}

  getData<T>(url: string, defaultValue?: T): Observable<T> {
    return this.http.get<T>(url)
      .pipe(
        catchError((error: any) => this.handleError(url, error, defaultValue))
      );
  }

  postData(url: string, data: any): Observable<Object> {
    return this.http.post(url, data, this.httpOptions)
      .pipe(
        catchError((error: any) => this.handleError(url, error))
      );
  }

  handleError<T>(url: string, error: any, defaultValue?: T): Observable<T> {
    this.hasErrorSubject.next(true);
    this.logger.log("HTTP", LogLevel.Error, url + ' - ERROR: ' + JSON.stringify(error));
    return of(defaultValue as T);
  }

  hasErrorObservable(): Observable<boolean> {
    return this.hasError;
  }
}
