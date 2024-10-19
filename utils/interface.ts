export enum INodeTypeEnum {
  input = "inputNode",
  output = "outputNode",
  mixer = "mixerNode",
}

export interface IPayload extends Node {
  id: string;
  type: INodeTypeEnum;
  position: { x: number; y: number };
  color?: string;
  label: string;
  isEdit: boolean;
}
