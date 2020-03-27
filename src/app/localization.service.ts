import { Injectable, LOCALE_ID, Inject } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpService } from './http.service';
import { NetworkResponse } from './network-response';
import { LoggerService, LogLevel } from './logger.service';

@Injectable()
export class LocalizationService {
  private localizationTable: Map<string, Object>;
  private currentLanguage: string;

  constructor(
    private http: HttpService,
    private logger: LoggerService,
    @Inject(LOCALE_ID) private localeId: string
  ) {
    this.currentLanguage = localeId.substring(0, 2);

    this.logger.log("Localization", LogLevel.Info, "Language: " + this.currentLanguage);
  }

  getLocalization(): Observable<Object> {
    // Check for cached localization.
    if (this.localizationTable) {
      return new Observable((observer) => {
        let response: NetworkResponse<Map<string, Object>> = {
          success: true,
          data: this.localizationTable,
          error: null
        };

        observer.next(response);
      });
    }

    // Fetch localization from server.
    let observable = this.http.getData('http://localhost:8080/localization/get');

    observable.subscribe((response: NetworkResponse<LocalizationData>) => {
        if (response) {
          let localizationData: LocalizationData = response.data;

          this.logger.log("Localization", LogLevel.Verbose, "Localization response:\r\n" + JSON.stringify(response));

          this.localizationTable = new Map();

          for (let localizedString of localizationData.strings) {
            this.localizationTable.set(localizedString['id'], localizedString);
          }
        }
      });

    return observable;
  }

  get(id: string): string {
    if (!this.localizationTable) {
      return id;
    }

    if (!this.localizationTable.has(id)) {
      return id;
    }

    return this.localizationTable.get(id)[this.currentLanguage];
  }
}

interface LocalizationData {
	hash: string;
  strings: any[];
}
