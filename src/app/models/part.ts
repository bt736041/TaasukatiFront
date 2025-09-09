export enum PartStatus { 'idle', 'inProgress', 'completed' }
export interface Part {
  id: string;
  title:string;
  description:string;
  status: PartStatus;
  pathToNavigate:string;
}
