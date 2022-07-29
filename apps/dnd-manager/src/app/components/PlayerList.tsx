import { PlayerData } from '@sakkaku-web/dnd-data-api';

interface PlayerListProps {
  playerLists: PlayerData[];
}

function PlayerList({ playerLists }: PlayerListProps) {
  return (
    <div className="my-3">
      <h3 className="mb-0 text-2xl font-bold">
        Player list ({playerLists.length}):
      </h3>
      {playerLists.map((player) => {
        return (
          <div key={player.name} className="mb-3 border border-black">
            <p className="text-xl">
              <span className="font-bold">{player.name}</span> ({player.class})
            </p>
            {Object.entries(player.stats).map(([key, value]) => {
              return (
                <p key={key}>
                  {key}: {value}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default PlayerList;
