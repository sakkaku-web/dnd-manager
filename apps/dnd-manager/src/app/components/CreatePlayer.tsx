import axios from 'axios';
import { useEffect, useState } from 'react';
import InputComponent from './shared/InputComponent';
import Button from './shared/ButtonComponent';

interface CharacterClass {
  index: string;
  name: string;
  url: string;
}

interface CharacterStats {
  index: string;
  name: string;
  url: string;
}

interface Input {
  characterName: string;
  cha: string;
  con: string;
  dex: string;
  int: string;
  str: string;
  wis: string;
}

function CreatePlayer() {
  const [classes, setClasses] = useState<CharacterClass[]>([]);
  const [stats, setStats] = useState<CharacterStats[]>([]);
  const [input, setInput] = useState<Input>({
    characterName: '',
    cha: '',
    con: '',
    dex: '',
    int: '',
    str: '',
    wis: '',
  });
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const key = e.target.name;
    const value = e.target.value;
    setInput({
      ...input,
      [key]: value,
    });
  }

  function createPlayer() {
    /**
     * Create player function
     */
  }

  return (
    <div>
      <label htmlFor="name">Name</label>
      <InputComponent
        inputValue={input.characterName}
        inputName="characterName"
        handleChange={handleChange}
        type="text"
        id="name"
      />
      <label htmlFor="character-class">Character class</label>
      <select name="character-class" id="character-class">
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
            <InputComponent
              inputName={characterStats.index}
              inputValue={input[characterStats.index as keyof Input]}
              type="text"
              id={characterStats.name}
              handleChange={handleChange}
            />
          </div>
        );
      })}
      <Button>Create Player Character</Button>
    </div>
  );
}

export default CreatePlayer;
