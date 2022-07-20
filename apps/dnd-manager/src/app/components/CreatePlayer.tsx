import axios from 'axios';
import { useEffect, useState } from 'react';
import InputComponent from './shared/InputComponent';
import Button from './shared/ButtonComponent';
import { ABILITY_SCORES_API, CLASSES_API } from '../ApiLinks';

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

interface PlayerCharacter {
  playerName: string;
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
  const [playerCharacter, setPlayerCharacter] = useState<PlayerCharacter>({
    playerName: '',
    cha: '',
    con: '',
    dex: '',
    int: '',
    str: '',
    wis: '',
  });

  useEffect(() => {
    axios.get(CLASSES_API).then((response) => {
      const data = response.data.results;
      setClasses(data);
    });
    axios.get(ABILITY_SCORES_API).then((response) => {
      const data = response.data.results;
      setStats(data);
    });
  }, []);

  function setPlayerStat(key: string, value: string) {
    // const key = e.target.name;
    // const value = e.target.value;
    setPlayerCharacter({
      ...playerCharacter,
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
        inputValue={playerCharacter.playerName}
        handleChange={(event) =>
          setPlayerStat('characterName', event.target.value)
        }
        type="text"
        id="name"
      />
      <label htmlFor="character-class">Character class</label>
      <select name="character-class" id="character-class">
        {classes.map((characterClass) => {
          return (
            <option key={characterClass.index} value={characterClass.name}>
              {characterClass.name}
            </option>
          );
        })}
      </select>
      {stats.map((characterStats) => {
        return (
          <div key={characterStats.index}>
            <label htmlFor={characterStats.name}>{characterStats.name}</label>
            <InputComponent
              inputValue={
                playerCharacter[characterStats.index as keyof PlayerCharacter]
              }
              type="text"
              id={characterStats.name}
              handleChange={(event) =>
                setPlayerStat(characterStats.index, event.target.value)
              }
            />
          </div>
        );
      })}
      <Button>Create Player Character</Button>
    </div>
  );
}

export default CreatePlayer;
