export enum MissionStatus {
  Open = 'OPEN',
  Running = 'RUNNING',
  Finished = 'FINISHED'
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
