import { ICommand } from 'wokcommands';
import { rot } from '../resources/functions/.export.functions';
import info from '../resources/info';


export default {
    category: 'tools',
    description: 'rot shifting',
    testOnly: false,

    minArgs: 0,
    maxArgs: 2,
    expectedArgs: '[`number`] [text]',
    expectedArgsTypes: ["NUMBER", "STRING"],

    callback: ({ message, args }) => {
        let embed = {
            color: 0x4169e1,
            fields: Array(),
            footer: {
                text: `Bot \`V ${info.release.botVersion}\``
            },
            timestamp: new Date(),
        };

        if (!args[0] || args[0] == 'help' || !args[1] || !Number.isInteger(Number(args[0]))) {
            message.channel.send({
                embeds: [{
                    color: "#0099ff",
                    title: "Rot shifting",
                    url: "https://github.com/mathiasbynens/rot",
                    description: "A library that performs rotational letter substitution by `mathiasbynens`",
                    fields: [
                        {
                            name: "rot [number] [text]",
                            value: "Shift letters in [text] by [number]",
                            inline: true,
                        },
                        {
                            name: "[number]",
                            value: "Integer between -26 and 26",
                            inline: false,
                        },
                        {
                            name: "[text]",
                            value: "Support English only",
                            inline: true,
                        }
                    ],
                    timestamp: new Date(),
                }]
            });
        }
        else if (args[0]) {
            message.channel.send("Processing . . .").then(msg => {
                embed.fields.push({
                    name: `Completed !`,
                    value: `\`${rot(args[1], Number(BigInt(args[0]) % BigInt(26)))}\``,
                    inline: true
                });
                message.reply({ embeds: [embed] }).then(_ => msg.delete());
            });
        };
    }
} as ICommand;