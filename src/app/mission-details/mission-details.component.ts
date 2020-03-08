import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MissionsService } from '../missions.service';

@Component({
  selector: 'mission-details',
  templateUrl: './mission-details.component.html',
  styleUrls: ['./mission-details.component.css']
})
export class MissionDetailsComponent implements OnInit {
  mission;

  constructor(
      private route: ActivatedRoute,
      private missionsService: MissionsService
    ) { }

  ngOnInit() {
    this.mission = {}

    this.route.paramMap.subscribe(params => {
      this.missionsService.getMissions().subscribe(response => {
        this.mission = response.data[+params.get('index')];
      });
    });
  }
}
