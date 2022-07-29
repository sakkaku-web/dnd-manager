// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DNDDataApi, LocalStorageDataApi } from '@sakkaku-web/dnd-data-api';
import React, { useState } from 'react';
import CreatePlayer from './components/CreatePlayer';
import PlayerList from './components/PlayerList';
import Button from './components/shared/ButtonComponent';
import { PlayerData } from '@sakkaku-web/dnd-data-api';

const client: DNDDataApi = new LocalStorageDataApi();
export const ClientContext = React.createContext(client);

export function App() {
  const [sessionId, setSessionId] = useState('');
  const [playerList, setPlayerList] = useState<PlayerData[]>([]);

  async function onPlayerCreate(): Promise<void> {
    const players = await client.getPlayers(sessionId);
    setPlayerList(players);
  }

  return (
    <ClientContext.Provider value={client}>
      <div className="m-3">
        <h1>Hello World</h1>
        {sessionId ? (
          <div>
            <CreatePlayer sessionId={sessionId} onPlayerCreate={onPlayerCreate} />
            <PlayerList playerLists={playerList} />
          </div>
        ) : (
          <Button
            handleClick={async () => setSessionId(await client.createSession())}
          >
            Create Session
          </Button>
        )}
      </div>
    </ClientContext.Provider>
  );
}

export default App;
