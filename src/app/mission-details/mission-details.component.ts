import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { MissionsService } from '../missions.service';
import { CharactersService } from '../characters.service';
import { NetworkResponse } from '../network-response';
import { LoggerService, LogLevel } from '../logger.service';
import { Mission, MissionStatus } from '../mission';
import { LocalizationService } from '../localization.service';

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
      private location: Location,
      private missionsService: MissionsService,
      private charactersService: CharactersService,
      private localizationService: LocalizationService,
      private logger: LoggerService
    ) { }

  ngOnInit() {
    this.assignedCharacters = [];
    this.unassignedCharacters = [];

    const index = +this.route.snapshot.paramMap.get('index');

    this.missionsService.getMissions().subscribe((response: NetworkResponse) => {
      if (response) {
        this.mission = response.data[index];
        this.logger.log("Mission", LogLevel.Verbose, "Missions response:\r\n" + JSON.stringify(response));

        this.localizationService.getLocalization().subscribe(() => {
          this.mission.localizedName = this.localizationService.get(this.mission.name);

          for (let requirement of this.mission.requirements) {
            requirement.localizedRequirement = this.localizationService.get(requirement.requirement);
          }
        });
      }
    });

    this.charactersService.getCharacters().subscribe((response: NetworkResponse) => {
      if (response) {
        this.unassignedCharacters = response.data
        this.logger.log("Mission", LogLevel.Verbose, "Characters response:\r\n" + JSON.stringify(response));

        this.localizationService.getLocalization().subscribe(() => {
          for (let character of this.unassignedCharacters) {
            character.localizedName = this.localizationService.get(character.name);

            for (let skill of character.skills) {
              skill.localizedSkill = this.localizationService.get(skill.skill);
            }
          }
        });
      }
    });
  }

  assign(index: number) {
    let character = this.unassignedCharacters[index];
    this.assignedCharacters.push(character);
    this.unassignedCharacters.splice(index, 1);

    this.logger.log("Mission", LogLevel.Info, "Assigned character " + JSON.stringify(character));
  }

  unassign(index: number) {
      let character = this.assignedCharacters[index];
      this.unassignedCharacters.push(character);
      this.assignedCharacters.splice(index, 1);

      this.logger.log("Mission", LogLevel.Info, "Unassigned character " + JSON.stringify(character));
  }

  canStartMission(): boolean {
    if (!this.mission) {
      return false;
    }

    if (this.mission.status != MissionStatus.Open) {
      return false;
    }

    // Get mission requirements.
    let requirements = new Map();

    for (let requirement of this.mission.requirements) {
      requirements.set(requirement.requirement, requirement.count);
    }

    // Apply character skills.
    for (let character of this.assignedCharacters) {
      for (let skill of character.skills) {
        if (requirements.has(skill.skill)) {
          let requiredSkills = requirements.get(skill.skill);

          if (requiredSkills > 0) {
            requiredSkills -= skill.count;
            requirements.set(skill.skill, requiredSkills);
          }
        }
      }
    }

    // Check if all requirements are met.
    for (let [skill, count] of requirements.entries()) {
      if (count > 0) {
        return false;
      }
    }

    return true;
  }

  canFinishMission(): boolean {
    return this.mission && this.mission.status == MissionStatus.Finished;
  }

  startMission(): void {
    this.missionsService.startMission(this.mission, this.assignedCharacters)
      .subscribe(() => this.location.back());
  }

  finishMission(): void {
    this.missionsService.finishMission(this.mission)
      .subscribe(() => this.location.back());
  }
}
