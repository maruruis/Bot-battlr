import React from 'react';

const EnlistedBotCard = ({ bot, onDischarge }) => {
  const {  name, health, damage, armor, bot_class, avatar_url, catchphrase } = bot;

  const handleXClick = () => {
    onDischarge(bot);
  };

  return (
    <div className="enlisted-bot-card">
      <img src={avatar_url} alt={name} />
      <h3>{name}</h3>
      <p>
      <i class="fa-solid fa-heart-pulse"></i>
        {health}</p>
      <p>
      <i class="fa-sharp fa-solid fa-bolt-lightning"></i>
        {damage}</p>
      <p>
      <i class="fa-sharp fa-solid fa-shield-halved"></i>
        {armor}</p>
      <p>Class: {bot_class}</p>
      <p>Catchphrase: {catchphrase}</p>
      <button className="red-button" onClick={handleXClick}>X</button> 
    </div>
  );
};

export default EnlistedBotCard;