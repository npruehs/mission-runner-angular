import { Component, OnInit } from '@angular/core';

import { MissionsService } from '../missions.service';

@Component({
  selector: 'missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.css']
})
export class MissionsComponent implements OnInit {
  missions;

  constructor(
      private missionsService: MissionsService
    ) { }

  ngOnInit() {
    this.missions = []
    this.missionsService.getMissions().subscribe(response => this.missions = response.data);
  }
}
