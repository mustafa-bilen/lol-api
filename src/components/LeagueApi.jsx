import React, { useState } from "react";
import axios from "axios";

const LeagueApi = () => {
  const [searchText, setSearchText] = useState("");
  const [playerData, setPlayerData] = useState({});
  const API_KEY = "RGAPI-8cead454-59ad-446e-9bd6-dfd6ca78d30b";

  function searchForPlayer(event) {
    // set up the correct api call
    let APIcallString = `https://tr1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${searchText}?api_key=${API_KEY}`;
    // handle the api call
    axios
      .get(APIcallString)
      .then(function (response) {
        // success
        setPlayerData(response.data);
      })
      .catch(function (error) {
        // error section
        console.log(error);
      });
  }
  console.log(playerData);
  return (
    <div className="app">
      <div className="container  ">
        <h3>League of Legends Player Searcher</h3>
        <input type="text" onChange={(e) => setSearchText(e.target.value)} />
        <button
          className="rounded-lg bg-black text-white p-1"
          onClick={(e) => searchForPlayer(e)}
        >
          Search for player
        </button>

        {JSON.stringify(playerData) != "{}" ? (
          <>
            <p>{playerData.name}</p>
            <img
              width="100"
              height="100"
              src={`http://ddragon.leagueoflegends.com/cdn/12.18.1/img/profileicon/${playerData.profileIconId}.png`}
              alt="profileIcon"
            />
            <p>Summoner level {playerData.summonerLevel}</p>
          </>
        ) : (
          <>
            <p>No player data</p>
          </>
        )}
      </div>
    </div>
  );
};

export default LeagueApi;
