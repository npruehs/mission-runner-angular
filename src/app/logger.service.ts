import { Injectable } from '@angular/core';

export enum LogLevel {
    Error,
    Warning,
    Info,
    Verbose
}

@Injectable()
export class LoggerService {
  private logLevels: Map<string, LogLevel> = new Map<string, LogLevel>();
  private tempLogCategory: string = "Temp";

  constructor() {
    this.logLevels.set('tempLogCategory', LogLevel.Verbose);
  }

  setLogLevel(logCategory: string, categoryLogLevel: LogLevel): void {
    this.logLevels.set(logCategory, categoryLogLevel);
  }

  logTemp(message: string): void {
    this.log(this.tempLogCategory, LogLevel.Verbose, message);
  }

  log(logCategory: string, logLevel: LogLevel, message: string): void {
    if (this.logLevels.has(logCategory)) {
      let categoryLogLevel = this.logLevels.get(logCategory);

      if (logLevel > categoryLogLevel) {
        return;
      }
    }

    let now = new Date();
    let logMessage = '[' + now.getFullYear().toString().padStart(4, '0') + '.' + now.getMonth().toString().padStart(2, '0') + '.' + now.getDate().toString().padStart(2, '0')
      + '-' + now.getHours().toString().padStart(2, '0') + '.' + now.getMinutes().toString().padStart(2, '0') + '.' + now.getSeconds().toString().padStart(2, '0')
      + ':' + now.getMilliseconds().toString().padStart(3, '0') + '] ' + logCategory + ': ' + message;

    switch (logLevel) {
      case LogLevel.Error:
        console.error(logMessage);
        break;

      case LogLevel.Warning:
        console.warn(logMessage);
        break;

      default:
        console.log(logMessage);
        break;
    }
  }
}
