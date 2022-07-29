import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import InputComponent from './shared/InputComponent';
import Button from './shared/ButtonComponent';
import SpinnerComponent from './shared/SpinnerComponent';
import { ABILITY_SCORES_API, CLASSES_API } from '../ApiLinks';
import { ClientContext } from '../app';
import { PlayerData, Stats } from '@sakkaku-web/dnd-data-api';

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
  name: string;
  class: string;
  cha: number;
  con: number;
  dex: number;
  int: number;
  str: number;
  wis: number;
}

interface CreatePlayerProps {
  sessionId: string;
  onPlayerCreate(): void;
}

function CreatePlayer({ sessionId, onPlayerCreate }: CreatePlayerProps) {
  const [classes, setClasses] = useState<CharacterClass[]>([]);
  const [stats, setStats] = useState<CharacterStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const client = useContext(ClientContext);
  const [playerCharacter, setPlayerCharacter] = useState<PlayerCharacter>({
    name: '',
    class: '',
    cha: 0,
    con: 0,
    dex: 0,
    int: 0,
    str: 0,
    wis: 0,
  });

  function mapPlayerCharacterToData(playerCharacter: PlayerCharacter): PlayerData {
    return {
      name: playerCharacter.name,
      class: playerCharacter.class,
      stats: {
        [Stats.CHA]: playerCharacter.cha,
        [Stats.CON]: playerCharacter.con,
        [Stats.DEX]: playerCharacter.dex,
        [Stats.INT]: playerCharacter.int,
        [Stats.STR]: playerCharacter.str,
        [Stats.WIS]: playerCharacter.wis,
      },
    };
  }

  useEffect(() => {
    const classes = axios.get(CLASSES_API).then((response) => {
      const data = response.data.results;
      setClasses(data);
    });
    const abilityScores = axios.get(ABILITY_SCORES_API).then((response) => {
      const data = response.data.results;
      setStats(data);
    });
    Promise.all([classes, abilityScores]).then(() => setIsLoading(false));
  }, []);

  function setPlayerStat(key: keyof PlayerCharacter, value: string) {
    setPlayerCharacter({
      ...playerCharacter,
      [key]: value,
    });
  }

  return (
    <div>
      {isLoading ? (
        <SpinnerComponent />
      ) : (
        <div>
          <label htmlFor="character-class">Character class</label>
          <select
            onChange={(e) => setPlayerStat('class', e.target.value)}
            name="character-class"
            id="character-class"
          >
            {classes.map((characterClass) => {
              return (
                <option key={characterClass.index} value={characterClass.name}>
                  {characterClass.name}
                </option>
              );
            })}
          </select>
          <label htmlFor="name">Name</label>
          <InputComponent
            value={playerCharacter.name}
            handleChange={(event) => setPlayerStat('name', event.target.value)}
            type="text"
            id="name"
          />
          {stats.map((characterStats) => {
            return (
              <div key={characterStats.index}>
                <label htmlFor={characterStats.name}>{characterStats.name}</label>
                <InputComponent
                  value={
                    playerCharacter[characterStats.index as keyof PlayerCharacter]
                  }
                  type="number"
                  minNumber="0"
                  id={characterStats.name}
                  handleChange={(event) =>
                    setPlayerStat(
                      characterStats.index as keyof PlayerCharacter,
                      event.target.value
                    )
                  }
                />
              </div>
            );
          })}
          <Button
            handleClick={() => {
              client.addPlayer(sessionId, mapPlayerCharacterToData(playerCharacter));
              onPlayerCreate();
            }}
          >
            Create Player Character
          </Button>
        </div>
      )}
    </div>
  );
}

export default CreatePlayer;
