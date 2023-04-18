import { addTrack } from "../repository/track.js";

/**
 * Adds the song to the Discord server's queue. If there's no track currently playing,
 * it also plays it.
 * @param {import("discord.js").Interaction} interaction
 * @param {import("discord.js").AudioPlayer} audioPlayer
 * @returns {Promise<import("discord.js").Message<boolean>>}
 */
export default async function execute(interaction) {
  //if (interaction.member.voice.channel === null) return;
  const songId = interaction.customId;
  const serverId = interaction.guildId;

  try {
    await addTrack(serverId, songId);
  } catch {
    return interaction.reply("Unable to add the song to the queue.");
  }

  return interaction.reply(interaction.customId + " added to the database!");
}
