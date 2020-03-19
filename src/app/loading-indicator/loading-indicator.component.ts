import { Component, OnInit, Input } from '@angular/core';

import { HttpService } from '../http.service';

@Component({
  selector: 'loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.css']
})
export class LoadingIndicatorComponent {
  @Input()
  private data: any;
  private hasHttpError: boolean;

  constructor(private http: HttpService) {
    http.hasErrorObservable().subscribe(hasError => this.hasHttpError = hasError);
  }

  getData(): any {
    return this.data;
  }

  hasError(): boolean {
    return this.hasHttpError;
  }
}
