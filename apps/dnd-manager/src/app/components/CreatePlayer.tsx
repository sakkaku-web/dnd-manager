import axios from 'axios';
import { useEffect, useState } from 'react';

interface CharacterClass {
  index: string;
  name: string;
  url: string;
}

function CreatePlayer() {
  const [classes, setClasses] = useState<CharacterClass[]>([]);
  const API_CLASSES = 'https://www.dnd5eapi.co/api/classes';

  useEffect(() => {
    axios.get(API_CLASSES).then((response) => {
      const data = response.data.results;
      setClasses(data);
    });
  }, []);

  return (
    <div>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" />
      <label htmlFor="class">Class</label>
      <select name="class" id="class">
        {classes.map((characterClass, index) => {
          return (
            <option key={index} value={characterClass.name}>
              {characterClass.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default CreatePlayer;
