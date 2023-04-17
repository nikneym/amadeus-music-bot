import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Colors,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { Scraper } from "scraper-edge";

const yt = new Scraper("en-EN");

/**
 * Creates an embed for a given video.
 * @param {import("scraper-edge").Video} video
 * @returns {import("discord.js").EmbedBuilder}
 */
function createEmbed(video) {
  const title = video.title.slice(0, Math.min(video.title.length, 40));
  const from =
    video.channel.name +
    (video.channel.verified ? " :ballot_box_with_check: " : "");

  return new EmbedBuilder()
    .setColor(Colors.Red)
    .setTitle(title)
    .setThumbnail(video.thumbnail)
    .addFields(
      { name: "From", value: from, inline: true },
      { name: "Length", value: video.duration_raw, inline: true }
    );
}

/**
 * Search command
 */
export default {
  data: new SlashCommandBuilder()
    .setName("search")
    .setDescription("Search a song on YouTube")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("The song or video you're searching for")
        .setRequired(true)
    ),

  /**
   * Execute a ping command
   * @param {import("discord.js").Interaction} interaction
   */
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    const query = interaction.options.getString("query", true);

    // search the given query and get 4 results max
    let videos;
    try {
      const result = await yt.search(query, { searchType: "music" });
      videos = result.videos;
    } catch {
      return interaction.editReply("Failed to get results of your search.");
    }

    if (videos.length === 0) {
      return interaction.editReply("No results found.");
    }

    // create embeds and buttons for the videos
    const embeds = [];
    const row = new ActionRowBuilder();

    let i = 1;
    for (const video of videos.slice(0, Math.min(videos.length, 4))) {
      if (video.id.length > 100) continue;

      try {
        embeds.push(createEmbed(video));
        row.components.push(
          new ButtonBuilder()
            .setCustomId(video.id)
            .setLabel(`#${i}`)
            .setStyle(ButtonStyle.Primary)
        );
      } catch {
        continue;
      }

      i++;
    }

    await interaction.editReply({
      embeds: embeds,
      components: [row],
    });
  },
};
