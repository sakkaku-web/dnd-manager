import axios from 'axios';
import { useEffect, useState } from 'react';

interface CharacterClass {
  index: string;
  name: string;
  url: string;
}

interface CharacterStats {
  name: string;
}

function CreatePlayer() {
  const [classes, setClasses] = useState<CharacterClass[]>([]);
  const [stats, setStats] = useState<CharacterStats[]>([]);
  const API_CLASSES = 'https://www.dnd5eapi.co/api/classes';
  const API_STATS = ' https://www.dnd5eapi.co/api/ability-scores';

  useEffect(() => {
    axios.get(API_CLASSES).then((response) => {
      const data = response.data.results;
      setClasses(data);
    });
    axios.get(API_STATS).then((response) => {
      const data = response.data.results;
      setStats(data);
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
      {stats.map((characterStats, index) => {
        return (
          <div key={index}>
            <label htmlFor={characterStats.name}>{characterStats.name}</label>
            <input id={characterStats.name} type="text" />
          </div>
        );
      })}
    </div>
  );
}

export default CreatePlayer;
