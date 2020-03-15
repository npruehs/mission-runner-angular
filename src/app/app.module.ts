import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';

import { AccountComponent } from './account/account.component';
import { AccountService } from './account.service';
import { MissionsComponent } from './missions/missions.component';
import { MissionsService } from './missions.service';
import { MissionDetailsComponent } from './mission-details/mission-details.component';
import { CharactersService } from './characters.service';

import { LoggerService } from './logger.service';
import { HttpService } from './http.service';

import { AppRoutingModule }  from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    AccountComponent,
    MissionsComponent,
    MissionDetailsComponent,
    LoadingIndicatorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AccountService,
    MissionsService,
    CharactersService,
    LoggerService,
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
