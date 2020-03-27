import { Component, OnInit, Input } from '@angular/core';

import { Mission, MissionStatus } from './mission';

@Component({
  selector: 'mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})
export class MissionComponent implements OnInit {
  @Input()
  private mission: Mission;
  private interval: any;

  MissionStatus = MissionStatus;

  constructor() {
  }

  ngOnInit() {
    if (this.mission) {
      if (this.mission.remainingTime <= 0) {
        this.mission.status = MissionStatus.Finished;
      }

      if (this.mission.status == MissionStatus.Running) {
        this.interval = setInterval(() => {
          if (this.mission.remainingTime > 0) {
            --this.mission.remainingTime;
          } else {
            this.mission.remainingTime = 0;
            this.mission.status = MissionStatus.Finished;

            clearInterval(this.interval);
            this.interval = null;
          }
        }, 1000);
      }
    }
  }

  getMission(): Mission {
    return this.mission;
  }
}
