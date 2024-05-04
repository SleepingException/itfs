import { IEmployeeSkill } from './skill';

export interface IEmployee {
  id: number;
  firstName: string;
  secondName: string;
  lastName: string;
  position: string;
  salary: string;
  phone: string;
  hardSkills: IEmployeeSkill;
  softSkills: IEmployeeSkill;
}
