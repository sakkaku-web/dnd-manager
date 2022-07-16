export interface DNDDataApi {
  createSession(): Promise<string>;
  addPlayer(id: string, player: PlayerData): Promise<void>;
}

export interface PlayerData {
  name: string;
  class: string;
  stats: Record<Stats, number>;
}

export enum Stats {
  CHA,
  CON,
  DEX,
  INT,
  STR,
  WIS,
}
