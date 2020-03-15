export enum MissionStatus {
  OPEN,
  RUNNING,
  FINISHED
}

export interface MissionRequirement {
	requirement: string;
	count: number;
}

export interface Mission {
  id: number;
  name: string;
  status: MissionStatus;
  requirements: MissionRequirement[];
  requiredTime: number;
  remainingTime: number;
  reward: number;
}
