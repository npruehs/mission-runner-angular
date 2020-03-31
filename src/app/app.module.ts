import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';

import { AccountComponent } from './account/account.component';
import { AccountService } from './account/account.service';
import { CharactersService } from './characters/characters.service';
import { MissionsComponent } from './missions/missions.component';
import { MissionsService } from './missions/missions.service';
import { MissionDetailsComponent } from './missions/mission-details.component';
import { MissionComponent } from './missions/mission.component';

import { LoggerService } from './logger.service';
import { HttpService } from './http.service';
import { LocalizationService } from './localization.service';

import { AppRoutingModule }  from './app-routing.module';

import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    AccountComponent,
    MissionsComponent,
    MissionDetailsComponent,
    MissionComponent,
    LoadingIndicatorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ButtonModule
  ],
  providers: [
    AccountService,
    MissionsService,
    CharactersService,
    LoggerService,
    HttpService,
    LocalizationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
