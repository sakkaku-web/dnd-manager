import { DNDDataApi, PlayerData } from './dnd-data-api';

interface Data {
  players: PlayerData[];
}

export class LocalStorageDataApi implements DNDDataApi {
  createSession(id: string): void {
    console.log(`Creating session with id ${id}`);
    localStorage.setItem(id, JSON.stringify({ players: [] }));
  }

  addPlayer(id: string, player: PlayerData): void {
    const data = localStorage.getItem(id);
    if (!data) {
      console.log(`Session with id ${id} does not exist`);
      throw new Error('Session does not exist');
    }

    const json: Data = JSON.parse(data);
    json.players.push(player);
    localStorage.setItem(id, JSON.stringify(json));
  }
}
