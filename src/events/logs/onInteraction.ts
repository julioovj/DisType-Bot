import { Event } from "../../structs/types/Event";
import { config } from "../..";
import { ColorResolvable, EmbedBuilder, time } from "discord.js";

const logsCanal = "Seu ID de canal de texto";

export default new Event({
  name: "interactionCreate",
  async run(interaction) {
    if (!interaction.inCachedGuild()) return;

    if (interaction.isCommand()) {
      const logs = interaction.guild.channels.cache.get(logsCanal);
      if (!logs?.isTextBased()) return;
      const { channel, user, commandType, createdAt, commandName } =
        interaction;
      const emoji = ["👤"];
      if (channel) {

        const embedLog = new EmbedBuilder()
          .setColor(config.colors.theme["info"] as ColorResolvable)
          .setAuthor({
            name: `@${user.username}`,
            iconURL: user.displayAvatarURL(),
          })
          .setDescription(
            `${emoji[commandType - 1]} Utilizou ${time(
              createdAt,
              "R"
            )} o comando \`${commandName}\`em ${channel.url}`
          );

        logs.send({ embeds: [embedLog] });
        return;
      }
    }
  },
});
