import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountComponent } from './account/account.component';
import { MissionsComponent } from './missions/missions.component';
import { MissionDetailsComponent } from './missions/mission-details.component';

const routes: Routes = [
  { path: '', component: AccountComponent },
  { path: 'missions', component: MissionsComponent },
  { path: 'missions/:index', component: MissionDetailsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
