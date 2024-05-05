export interface ILevels {
  id: number;
  level: E_LEVEL;
  levelName: string;
  description: string;
}

export enum E_LEVEL {
  X = 'X',
  F = 'F',
  D = 'd',
  C = 'C',
}
