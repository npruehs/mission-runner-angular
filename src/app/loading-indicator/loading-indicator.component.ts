import { Component, OnInit, Input } from '@angular/core';

import { HttpService } from '../http.service';

@Component({
  selector: 'loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.css']
})
export class LoadingIndicatorComponent implements OnInit {
  @Input() data: Object;
  hasError: boolean;

  constructor(private http: HttpService) {
    http.hasError.subscribe(hasError => this.hasError = hasError);
  }

  ngOnInit() {
  }
}
