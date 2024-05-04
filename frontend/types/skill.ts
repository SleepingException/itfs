export interface ISkill {
  name: string;
  description: string;
  type: E_SKILL_TYPE;
}

export interface IEmployeeSkill extends ISkill {
  skillLevel: string;
}

export enum E_SKILL_TYPE {
  HARD = 'HARD',
  SOFT = 'SOFT',
}
