export type LaneInfo = {
  Data: Array<Lane>;
  Prot: Protocol;
  RV: number;
  Rsp: Command;
  SeqNo: number;
  SeqNoRsp: number;
  SubProt: SubProtocol;
  VerP: number;
  VerSP: number;
};

export type Lane = {
  Free: boolean;
  LaneNo: number;
  Shooter: string;
};

export enum Protocol {
  MEWS = 'MEWS',
}

export enum SubProtocol {
  LA = 'LA',
}

export enum Command {
  GetLaneInfo = 'GetLaneInfo',
}

export type Placeholder = {
  text?: string;
};
