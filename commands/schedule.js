const { default: axios } = require('axios');
const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { download } = require('../download.js');
const { buildEmbed } = require('../utils/buildEmbed.js');
const { dateIsAfterNow } = require('../utils/getDate.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('next')
    .setDescription('Get the next LWJ episode details'),

  async execute(interaction) {
    await interaction.deferReply();

    const res = await axios.get(
      'https://www.learnwithjason.dev/api/v2/schedule'
    );

    const poster = new AttachmentBuilder(`./tmp/image.jpg`);

    let index = 0;
    let epIsAfterNow;
    let embed;
    epIsAfterNow = dateIsAfterNow(res.data[index].date);

    if (epIsAfterNow) {
      embed = buildEmbed(res.data[index]);
      await download(res.data[index]);
    } else {
      index = index + 1;
      embed = buildEmbed(res.data[index]);
      await download(res.data[index]);
    }

    interaction.editReply({
      embeds: [embed],
      files: [poster],
    });
  },
};
