import { Client, Events, GatewayIntentBits } from "discord.js";
import Commands from "./commands.js";
import "./init.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isChatInputCommand()) {
    // regular chat command
    const command = Commands.get(interaction.commandName);
    if (!command) {
      return interaction.reply({
        content: "Unknown command.",
        ephemeral: true,
      });
    }

    return command.execute(interaction);
  } else if (interaction.isButton()) {
    return Commands.get("onSongSelection")(interaction);
  }
});

client.on(Events.ClientReady, (interaction) => {
  console.log(`${interaction.user.username} is ready!`);
});

await client.login(process.env.TOKEN);
