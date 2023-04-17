import addTrack from "../repository/add_track.js";
import getTracks from "../repository/get_tracks.js";

/**
 * Adds the song to the Discord server's queue. If there's no track currently playing,
 * it also plays it.
 * @param {import("discord.js").Interaction} interaction
 * @param {import("@discordjs/voice").AudioPlayer} audioPlayer
 */
export default async function execute(interaction) {
  //if (interaction.member.voice.channel === null) return;
  try {
    await addTrack(interaction.guildId, interaction.customId);
  } catch {
    return interaction.reply("unable to add the song to the queue.");
  }

  (await getTracks(interaction.guildId)).forEach((e) => console.log(e));

  return interaction.reply(interaction.customId + " added to the database!");
}
