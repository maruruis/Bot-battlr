import React, { useState, useEffect } from 'react';
import YourBotArmy from './YourBotArmy';
import BotCollection from './BotCollection';
import BotSpecs from './BotSpecs';
import '../App.css';

const App = () => {
  const [enlistedBots, setEnlistedBots] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8001/bots')
      .then((response) => response.json())
      .then((data) => {
        setEnlistedBots(data.filter((bot) => bot.isEnlisted));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleEnlist = (bot) => {
    if (enlistedBots.some((b) => b.id === bot.id)) {
      setEnlistedBots(enlistedBots.filter((b) => b.id !== bot.id));
    } else {
      setEnlistedBots([...enlistedBots, bot]);
    }
  };

  const handleDischarge = (dischargedBot) => {
  
    setEnlistedBots(enlistedBots.filter((bot) => bot.id !== dischargedBot.id));


    fetch(`http://localhost:8001/bots/${dischargedBot.id}?force=true`, {
      method: 'DELETE',
    })
    .catch((error) => {
      console.error('Error discharging bot:', error);
    });
  };

  return (
    <div>
      <h1>Welcome to Bot Battlr</h1>
      <YourBotArmy enlistedBots={enlistedBots} onDischarge={handleDischarge} />
      <BotCollection onEnlist={handleEnlist} enlistedBots={enlistedBots} />
      {selectedBot && (
        <BotSpecs
          selectedBot={selectedBot}
          onEnlist={handleEnlist}
          onBackToListView={() => setSelectedBot(null)}
        />
      )}
    </div>
  );
};

export default App;
