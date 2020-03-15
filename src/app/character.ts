export enum CharacterStatus {
	IDLE,
  MISSION
}

export interface CharacterSkill {
	skill: string;
	count: number;
}

export interface Character {
  id: number;
  name: string;
  status: CharacterStatus;
  missionId: number;
  skills: CharacterSkill[];
}
