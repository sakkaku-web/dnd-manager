import React, { useContext } from 'react';
import { ClientContext } from '../app';

function CreateSession() {
  const client = useContext(ClientContext);
  return (
    <div>
      <form action="">
        <label htmlFor="session-name">Session Name:</label>
        <input className="border border-black" type="text" id="session-name" />
      </form>
    </div>
  );
}

export default CreateSession;
