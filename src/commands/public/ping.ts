import {
  ActionRowBuilder,
  ApplicationCommandType,
  ButtonBuilder,
  ButtonStyle,
  Collection,
  time,
} from "discord.js";
import { Command } from "../../structs/types/Command";
import { client } from "../..";

export default new Command({
  name: "ping",
  description: "[Informação] Mostrarei o meu ping de resposta",
  type: ApplicationCommandType.ChatInput,
  async run({ interaction }) {
    interaction.deferReply({ ephemeral: true });
    // Resposta do comando
    setTimeout(() => {
      interaction.editReply({
        content: `> 🏓 Pooong!\n> 💻 Client: ${client.ws.ping}ms`,
      });
    }, 1500);
  },
});
