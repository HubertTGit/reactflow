export enum INodeTypeEnum {
  input = 'input',
  output = 'output',
  mixer = 'mixer',
}

export interface IPayload {
  id: string;
  type: INodeTypeEnum;
  position: { x: number; y: number };
  color?: string;
  label: string;
  isEdit: boolean;
}
