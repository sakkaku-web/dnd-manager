export interface DNDDataApi {
  createSession(): Promise<string>;
  addPlayer(id: string, player: PlayerData): Promise<void>;
  getPlayers(id: string): Promise<PlayerData[]>;
}

export interface PlayerData {
  name: string;
  class: string;
  stats: Record<Stats, number>;
}

export enum Stats {
  CHA = 'CHA',
  CON = 'CON',
  DEX = 'DEX',
  INT = 'INT',
  STR = 'STR',
  WIS = 'WIS',
}
