import { useContext } from 'react';
import { ClientContext } from '../app';

interface CreateSessionProps {
  setSessionId: (sessionId: string) => void;
}

function CreateSession(props: CreateSessionProps) {
  const client = useContext(ClientContext);

  async function onClick() {
    props.setSessionId(await client.createSession());
  }

  return (
    <div>
      <button onClick={() => onClick()}>Create Session</button>
    </div>
  );
}

export default CreateSession;
