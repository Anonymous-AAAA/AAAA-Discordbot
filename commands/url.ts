import { ICommand } from 'wokcommands';
import info from '../resources/info';


export default {
    category: 'tools',
    description: 'URL encoded/decode text',
    testOnly: true,

    minArgs: 0,
    maxArgs: 2,
    expectedArgs: '[`e` / `d`] [text]',

    callback: ({ message, args }) => {
        let embed = {
            color: 0x4169e1,
            fields: Array(),
            footer: {
                text: `Bot \`V ${info.release.botVersion}\``
            },
            timestamp: new Date(),
        };

        if (!args[0] || args[0] == 'help' || !args[1]) {
            message.channel.send({
                embeds: [{
                    color: "#0099ff",
                    title: "URL encoded/decode",
                    fields: [
                        {
                            name: "url [`e`/`d`] [text]",
                            value: "URL encode/decode [text]",
                            inline: true,
                        },
                        {
                            name: "[`e`/`d`]",
                            value: "`e`: Encode\n`d`: Decode",
                            inline: false,
                        },
                        {
                            name: "`e` [text]",
                            value: "All languages supported",
                            inline: false,
                        },
                    ],
                    timestamp: new Date(),
                }]
            });
        } else if (args[0] == 'e') {
            message.channel.send("Encoding . . .").then(msg => {
                embed.fields.push({
                    name: `Completed !`,
                    value: `\`${encodeURI(args[1])}\``,
                    inline: true
                });
                message.reply({ embeds: [embed] }).then(_ => msg.delete());
            });
        }
        else if (args[0] == 'd') {
            message.channel.send("Decoding . . .").then(msg => {
                embed.fields.push({
                    name: `Completed !`,
                    value: `\`${decodeURI(args[1])}\``,
                    inline: true
                });
                message.reply({ embeds: [embed] }).then(_ => msg.delete());
            });
        };
    }
} as ICommand;