import { Injectable } from '@angular/core';

export enum LogLevel {
    Error,
    Warning,
    Info,
    Verbose
}

@Injectable()
export class LoggerService {
  logLevels;
  tempLogCategory: string = "Temp";

  constructor() {
    this.logLevels = {
      tempLogCategory: LogLevel.Verbose
    };
  }

  setLogLevel(logCategory: string, categoryLogLevel: LogLevel) {
    this.logLevels[logCategory] = categoryLogLevel;
  }

  logTemp(message: string) {
    this.log(this.tempLogCategory, LogLevel.Verbose, message);
  }

  log(logCategory: string, logLevel: LogLevel, message: string) {
    if (logCategory in this.logLevels) {
      let categoryLogLevel = this.logLevels[logCategory];

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
