import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, Subject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LoggerService, LogLevel } from './logger.service';

@Injectable()
export class HttpService {
  private hasErrorSubject = new Subject<boolean>();

  hasError = this.hasErrorSubject.asObservable();

  constructor(
    private http: HttpClient,
    private logger: LoggerService
  ) {}

  getData<T>(url: string, defaultValue?: T) {
    return this.http.get(url)
      .pipe(
        catchError((error: any) => this.handleError(url, error, defaultValue))
      );
  }

  handleError<T>(url: string, error: any, defaultValue?: T): Observable<T> {
    this.hasErrorSubject.next(true);
    this.logger.log("HTTP", LogLevel.Error, url + ' - ERROR: ' + JSON.stringify(error));
    return of(defaultValue as T);
  }
}
