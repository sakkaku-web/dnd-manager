export interface DNDDataApi {
  createSession(): string;
  addPlayer(id: string, player: PlayerData): void;
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
