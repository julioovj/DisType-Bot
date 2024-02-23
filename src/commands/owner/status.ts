import {
  ActivityType,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  Collection,
  ColorResolvable,
  PresenceStatusData,
  PresenceUpdateStatus,
  codeBlock,
} from "discord.js";
import { config } from "../..";
import { Command, CommandType } from "../../structs/types/Command";

export default new Command({
  name: "atividade",
  description: "[Desenvolvedor] Controla a atividade de bot",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "definir",
      description: "[Desenvolvedor] Escolha uma mensagem a ser exibida na atividade do bot",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "mensagem",
          description: "[Desenvolvedor] mensagem que será exibida na atividade",
          type: ApplicationCommandOptionType.String,
          maxLength: 120,
          required: true,
        },
        {
          name: "tipo",
          description: "[Desenvolvedor] Tipo de atividade",
          type: ApplicationCommandOptionType.Number,
          choices: [
            { name: "Jogando", value: 0 },
            { name: "Transmitindo", value: 1 },
            { name: "Ouvindo", value: 2 },
            { name: "Assistindo", value: 3 },
            { name: "Competindo", value: 4 },
          ],
        },
        {
          name: "status",
          description: "[Desenvolvedor] Status da presença do bot",
          type: ApplicationCommandOptionType.String,
          choices: Object.entries(PresenceUpdateStatus).map(
            ([name, value]) => ({ name, value })
          ),
        },
      ],
    },
    {
      name: "limpar",
      description: "Limpa a atividade do bot",
      type: ApplicationCommandOptionType.Subcommand,
    },
  ],
  async run({ client, interaction, options }) {
    const developers = config.lead["owner"];

    // Verifica se o autor da interação está na lista de desenvolvedores
    if (developers && !developers.includes(interaction.user.id)) {
      await interaction.reply({
        content: "Este comando é apenas para desenvolvedores.",
        ephemeral: true, // A resposta será visível apenas para o autor da interação
      });
      return;
    }
    if (!interaction.inCachedGuild()) return;

    const bot = client.user;
    if (!bot) {
      interaction.reply({
        ephemeral: true,
        content: "Ocorreu um erro ao tentar executar esse comando!",
      });
      return;
    }

    switch (options.getSubcommand(true)) {
      case "definir": {
        const message = options.getString("mensagem", true);
        const type = options.getNumber("tipo") ?? ActivityType.Playing;
        const status = (options.getString("status") ??
          "online") as PresenceStatusData;

        bot.setPresence({ status, activities: [{ name: message, type }] });

        interaction.reply({
          ephemeral: true,
          content: `Mensagem de atividade do bot definida para: ${codeBlock(
            message
          )}`,
        });
        return;
      }
      case "limpar": {
        bot.setActivity();
        interaction.reply({
          ephemeral: true,
          content: `A atividade do bot foi limpa!`,
        });
        return;
      }
    }
  },
  buttons: new Collection([["", () => {}]]),
});
