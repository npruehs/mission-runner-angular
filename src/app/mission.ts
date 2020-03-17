export enum MissionStatus {
  Open = 'OPEN',
  Running = 'RUNNING',
  Finished = 'FINISHED'
}

export interface MissionRequirement {
	requirement: string;
	localizedRequirement: string;
	count: number;
}

export interface Mission {
  id: number;
  name: string;
  localizedName: string;
  status: MissionStatus;
  requirements: MissionRequirement[];
  requiredTime: number;
  remainingTime: number;
  reward: number;
}
