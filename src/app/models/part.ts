export enum PartStatus { 'idle', 'inProgress', 'completed' }
export interface Part {
  id: string;
  part:string;
  title:string,
  description:string;
  status: PartStatus;
  pathToNavigate:string;
  icon_src:string
}
