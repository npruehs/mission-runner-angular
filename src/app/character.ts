export enum CharacterStatus {
	IDLE,
  MISSION
}

export interface CharacterSkill {
	skill: string;
	localizedSkill: string;
	count: number;
}

export interface Character {
  id: number;
  name: string;
  localizedName: string;
  status: CharacterStatus;
  missionId: number;
  skills: CharacterSkill[];
}
