export enum CornerRadiusType {
  length = 'length',
  percentage = 'percentage',
}

export type Settings = {
  serverUrl: string;
  autoLayout: boolean;
  rows: number;
  cols: number;
  showName: boolean;
  cornerRadius: number;
  cornerRadiusType: CornerRadiusType;
  gap: number;
  colorFree: string;
  colorOccupied: string;
  colorText: string;
  intervall: number;
  fontSizeNumber: number;
  fontSizeName: number;
};

export const DEFAULT_SETTINGS: Settings = {
  serverUrl: '192.168.10.200',
  autoLayout: true,
  rows: 2,
  cols: 3,
  showName: true,
  cornerRadius: 12,
  cornerRadiusType: CornerRadiusType.length,
  gap: 10,
  colorFree: '#008000',
  colorOccupied: '#ff0000',
  colorText: '#e5e1e6',
  intervall: 1,
  fontSizeNumber: 200,
  fontSizeName: 24,
};

export const STORAGE_KEY = 'settings';

export type LaneInfo = {
  Data: Array<Lane>;
  Prot?: Protocol;
  RV?: number;
  Rsp?: Command;
  SeqNo?: number;
  SeqNoRsp?: number;
  SubProt?: SubProtocol;
  VerP?: number;
  VerSP?: number;
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
