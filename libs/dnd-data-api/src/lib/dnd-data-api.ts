export interface DNDDataApi {
  createSession(id: string): void;
  addPlayer(player: PlayerData): void;
}

export interface PlayerData {
  name: string;
  class: string;
  stats: Record<Stats, number>;
}

export enum Stats {
  cha,
  con,
  dex,
  int,
  str,
  wis,
}
