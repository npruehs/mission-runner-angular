import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MissionsService } from '../missions.service';
import { CharactersService } from '../characters.service'

@Component({
  selector: 'mission-details',
  templateUrl: './mission-details.component.html',
  styleUrls: ['./mission-details.component.css']
})
export class MissionDetailsComponent implements OnInit {
  mission;
  assignedCharacters;
  unassignedCharacters;

  constructor(
      private route: ActivatedRoute,
      private missionsService: MissionsService,
      private charactersService: CharactersService
    ) { }

  ngOnInit() {
    this.mission = {};

    this.route.paramMap.subscribe(params => {
      this.missionsService.getMissions().subscribe(response => {
        this.mission = response.data[+params.get('index')];
      });
    });

    this.assignedCharacters = [];
    this.unassignedCharacters = [];

    this.charactersService.getCharacters().subscribe(response => this.unassignedCharacters = response.data);
  }
}
