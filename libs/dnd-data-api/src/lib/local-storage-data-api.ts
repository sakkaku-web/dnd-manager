import { nanoid } from 'nanoid';
import { DNDDataApi, PlayerData } from './dnd-data-api';

const STORAGE_KEY_PREFIX = 'dnd-manager-';

interface Data {
  players: PlayerData[];
}

export class LocalStorageDataApi implements DNDDataApi {
  async createSession() {
    const id = nanoid();
    console.log(`Creating session with id ${id}`);
    this.setItem(id, { players: [] });
    return id;
  }

  async addPlayer(id: string, player: PlayerData) {
    const data: Data = this.getItem(id);
    if (!data) {
      console.log(`Session with id ${id} does not exist`);
      throw new Error('Session does not exist');
    }

    data.players.push(player);
    this.setItem(id, data);
  }

  private setItem(key: string, value: object | string) {
    const str = typeof value === 'object' ? JSON.stringify(value) : value;
    localStorage.setItem(STORAGE_KEY_PREFIX + key, str);
  }

  private getItem<T>(key: string): T {
    const str = localStorage.getItem(STORAGE_KEY_PREFIX + key);
    return str ? JSON.parse(str) : null;
  }
}
