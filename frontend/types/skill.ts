export interface ISkill {
  name: string;
  description: string;
  type: E_SKILL_TYPE;
}

export enum E_SKILL_TYPE {
  HARD = 'HARD',
  SOFT = 'SOFT',
}
