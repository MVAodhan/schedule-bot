const { EmbedBuilder } = require('discord.js');
const { getDate } = require('./getDate');

const buildEmbed = (episode) => {
  let dynamicFields;
  const utcToUs = getDate(episode.date);
  if (episode.guest.name !== episode.host.name) {
    dynamicFields = [
      { name: 'Guest', value: `${episode.guest.name}`, inline: true },
      { name: 'Host', value: `${episode.host.name}`, inline: true },
    ];
  } else {
    dynamicFields = [{ name: 'Host', value: `${episode.host.name}` }];
  }
  let embed = new EmbedBuilder()
    .setTitle('The Next Learn with Jason Episode')
    .setDescription(`${episode.title}`)
    .addFields({ name: 'Date', value: `${utcToUs} Pacific` }, ...dynamicFields)
    .setImage('attachment://image.jpg')
    .setURL(`${episode.uri}`);

  return embed;
};

module.exports = { buildEmbed };
