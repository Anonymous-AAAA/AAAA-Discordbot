import { ICommand } from 'wokcommands';
import { base64 } from '../resources/functions/.export.functions';
import info from '../resources/info';


export default {
    category: 'tools',
    description: 'use the base64 to encoded/decode text',
    testOnly: true,

    minArgs: 0,
    maxArgs: 2,
    expectedArgs: '[`e` / `d`] [text]',
    expectedArgsTypes: ["STRING"],

    callback: ({ message, args }) => {
        let embed = {
            color: 0x4169e1,
            fields: Array(),
            footer: {
                text: `Bot \`V ${info.release.botVersion}\``
            },
            timestamp: new Date(),
        };

        if (!args[0]|| args[0] == 'help' || !args[1]) {
            message.channel.send({
                embeds: [{
                    color: "#0099ff",
                    title: "Base64 encoded/decode",
                    url: "https://github.com/emn178/hi-base64",
                    thumbnail: {
                        url: "https://upload.wikimedia.org/wikipedia/commons/d/db/Npm-logo.svg",
                    },
                    description: "A Base64 encode/decode library by `emn178`",
                    fields: [
                        {
                            name: "base64 [`e`/`d`] [text]",
                            value: "Encode/Decode [text] with base64",
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
                    value: `\`${base64.encode(args[1])}\``,
                    inline: true
                });
                message.reply({embeds: [embed]}).then(_ => msg.delete());
            });
        }
        else if (args[0] == 'd') {
            message.channel.send("Decoding . . .").then(msg => {
                embed.fields.push({
                    name: `Completed !`,
                    value: `\`${base64.decode(args[1])}\``,
                    inline: true
                });
                message.reply({embeds: [embed]}).then(_ => msg.delete());
            });
        };
    }
} as ICommand;