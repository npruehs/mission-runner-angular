import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { AccountComponent } from './account/account.component';
import { AccountService } from './account.service';
import { MissionsComponent } from './missions/missions.component';
import { MissionDetailsComponent } from './mission-details/mission-details.component';
import { MissionsService } from './missions.service';
import { CharactersService } from './characters.service';
import { LoggerService } from './logger.service';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    AccountComponent,
    MissionsComponent,
    MissionDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: AccountComponent },
      { path: 'missions', component: MissionsComponent },
      { path: 'missions/:index', component: MissionDetailsComponent },
    ])
  ],
  providers: [
    AccountService,
    MissionsService,
    CharactersService,
    LoggerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
