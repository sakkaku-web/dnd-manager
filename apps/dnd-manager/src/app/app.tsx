// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DNDDataApi, LocalStorageDataApi } from '@sakkaku-web/dnd-data-api';
import React, { useContext, useState } from 'react';
import styles from './app.module.scss';
import CreateSession from './components/CreateSession';

const client: DNDDataApi = new LocalStorageDataApi();
export const ClientContext = React.createContext(client);

export function App() {
  const [sessionId, setSessionId] = useState('');

  return (
    <ClientContext.Provider value={client}>
      <div className=" bg-black xl:bg-white">
        <h1>Hello World</h1>
        <CreateSession setSessionId={setSessionId} />
      </div>
    </ClientContext.Provider>
  );
}

export default App;
