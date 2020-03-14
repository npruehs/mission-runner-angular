import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MissionsService } from '../missions.service';
import { CharactersService } from '../characters.service';
import { NetworkResponse } from '../network-response';
import { LoggerService, LogLevel } from '../logger.service';

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
      private charactersService: CharactersService,
      private logger: LoggerService
    ) { }

  ngOnInit() {
    this.mission = {};

    this.route.paramMap.subscribe(params => {
      this.missionsService.getMissions().subscribe((response: NetworkResponse) => {
        this.mission = response.data[+params.get('index')];
        this.logger.log("Mission", LogLevel.Verbose, "Missions response:\r\n" + JSON.stringify(response));
      });
    });

    this.assignedCharacters = [];
    this.unassignedCharacters = [];

    this.charactersService.getCharacters().subscribe((response: NetworkResponse) => {
      this.unassignedCharacters = response.data
      this.logger.log("Mission", LogLevel.Verbose, "Characters response:\r\n" + JSON.stringify(response));
    });
  }

  assign(index: number) {
    let character = this.unassignedCharacters[index];
    this.assignedCharacters.push(character);
    this.unassignedCharacters.splice(index);

    this.logger.log("Mission", LogLevel.Info, "Assigned character " + JSON.stringify(character));
  }

  unassign(index: number) {
      let character = this.assignedCharacters[index];
      this.unassignedCharacters.push(character);
      this.assignedCharacters.splice(index);

      this.logger.log("Mission", LogLevel.Info, "Unassigned character " + JSON.stringify(character));
  }
}
