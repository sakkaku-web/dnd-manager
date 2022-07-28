// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DNDDataApi, LocalStorageDataApi } from '@sakkaku-web/dnd-data-api';
import React, { useState } from 'react';
import CreatePlayer from './components/CreatePlayer';
import Button from './components/shared/ButtonComponent';

const client: DNDDataApi = new LocalStorageDataApi();
export const ClientContext = React.createContext(client);

export function App() {
  const [sessionId, setSessionId] = useState('');

  return (
    <ClientContext.Provider value={client}>
      <div>
        <h1>Hello World</h1>
        {sessionId ? (
          <CreatePlayer sessionId={sessionId} />
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
