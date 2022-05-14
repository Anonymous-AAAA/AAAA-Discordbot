import { Node } from 'cheerio';
import { ICommand } from 'wokcommands';
import { storegameID, request, cheerio, logToDiscord } from '../resources/functions/.export.functions';
import info from '../resources/info';


export default {
    category: 'tools',
    description: 'URL encoded/decode text',
    testOnly: true,

    minArgs: 0,
    maxArgs: 2,
    expectedArgs: '[`new`] [url]',

    callback: ({ message, args, client }) => {
        let embed = {
            color: 0xFFFF00,
            title: "如何連結帳號?",
            fields: Array(),
            footer: {
                text: `P.S. 別忘了檢查機器人回傳的網址是否正確喔~\nBot \`V ${info.release.botVersion}\``
            },
            timestamp: new Date(),
        };

        if (args[0] == 'new' && args[1] && args[1].substring(0, 8) === "https://" && args[1].length == 62) {
            message.channel.send("Processing . . .").then(message_ => {
                let gameID = args[1].substring(38, 62);
                let authorName = message.author.username;
                let authorID = message.author.id;
                storegameID(authorID, gameID).then(errcode => {
                    let value = "";
                    switch (errcode) {
                        case 0:
                            message.channel.send({
                                embeds: [{
                                    color: "#FF0000",
                                    title: `***Command failed with unexpected error !***`,
                                    description: 'Please contact `꧁AAAA꧂#2713` if kept facing this error',
                                    footer: {
                                        text: `Bot \`V ${info.release.botVersion}\``
                                    },
                                    timestamp: new Date(),
                                }]
                            }).then(_ => message_.delete());
                            break;

                        case 1:
                            try {
                                request(`https://stats.warbrokers.io/players/i/${gameID}`, (_error: any, _response: any, html: string | Buffer | Node | Node[]) => {
                                    let $ = cheerio.load(html);
                                    let gameName_long = $("head > title").text().toString();
                                    let gameName = gameName_long.substring(0, gameName_long.length - 14);
                                    message.channel.send({
                                        embeds: [{
                                            color: "#00FF00",
                                            title: `***Congrats ${authorName} !***\n**Successfully store your stats page !**`,
                                            fields: [
                                                {
                                                    name: "This is your stats page :",
                                                    value: `[${gameName}](https://stats.warbrokers.io/players/i/${gameID})`,
                                                }
                                            ],
                                            footer: {
                                                text: `Bot \`V ${info.release.botVersion}\``
                                            },
                                            timestamp: new Date(),
                                        }]
                                    }).then(_ => message_.delete());
                                });
                            }
                            catch (err: any) {
                                value = err.name + ": " + err.message;
                                logToDiscord(client, value);
                            }
                            finally {
                                if (value != "") {
                                    embed.color = 0xff0000
                                    embed.fields.push({
                                        name: "Error",
                                        value: `\`${value}\``,
                                        inline: true
                                    });
                                };
                            };
                            break;

                        case 2:
                            try {
                                request(`https://stats.warbrokers.io/players/i/${gameID}`, (_error: any, _response: any, html: string | Buffer | Node | Node[]) => {
                                    let $ = cheerio.load(html);
                                    let gameName_long = $("head > title").text().toString();
                                    let gameName = gameName_long.substring(0, gameName_long.length - 14);
                                    message.channel.send({
                                        embeds: [{
                                            color: "#FF0000",
                                            title: `We've already stored your stats !`,
                                            fields: [
                                                {
                                                    name: "This is your stats page :",
                                                    value: `[${gameName}](https://stats.warbrokers.io/players/i/${gameID})`,
                                                }
                                            ],
                                            footer: {
                                                text: `Bot \`V ${info.release.botVersion}\``
                                            },
                                            timestamp: new Date(),
                                        }]
                                    }).then(_ => message_.delete());
                                });
                            }
                            catch (err: any) {
                                value = err.name + ": " + err.message;
                                logToDiscord(client, value);
                            }
                            finally {
                                if (value != "") {
                                    embed.color = 0xff0000
                                    embed.fields.push({
                                        name: "Error",
                                        value: `\`${value}\``,
                                        inline: true
                                    });
                                };
                            };
                            break;

                        case 3:
                            message.channel.send({
                                embeds: [{
                                    color: "#FF0000",
                                    title: `***OOPS, I can't connect to your stats !***`,
                                    fields: [
                                        {
                                            name: "Do you enter the right url ?",
                                            value: `I can't find the statepage : ${args[1]}`,
                                        }
                                    ],
                                    footer: {
                                        text: `Bot \`V ${info.release.botVersion}\``
                                    },
                                    timestamp: new Date(),
                                }]
                            }).then(_ => message_.delete());
                            break;

                        default:
                            message_.channel.send({
                                embeds: [{
                                    color: "#FF0000",
                                    title: `***Command failed with unexpected error !***`,
                                    description: 'Please contact `꧁AAAA꧂#2713` if kept facing this error',
                                    footer: {
                                        text: `Bot \`V ${info.release.botVersion}\``
                                    },
                                    timestamp: new Date(),
                                }]
                            }).then(_ => message_.delete());
                            break;
                    };
                });
            });
        }
        else {
            message.channel.send("Processing . . .").then(message_ => {
                embed.fields.push(
                    {
                        name: "\u200B",
                        value: "**1.**進入 [War Brokers 官方網站](https://stats.warbrokers.io/)",
                    },
                    {
                        name: "\u200B",
                        value: "**2.**在左上角的 Player Search 搜尋框中輸入您遊戲中的名字",
                    },
                    {
                        name: "\u200B",
                        value: "**3.**在搜尋結果中選擇您的名字，點擊之後會進入您的玩家頁面",
                    },
                    {
                        name: "\u200B",
                        value: "**4.**複製視窗上方的網址，回到 Discord 中",
                    },
                    {
                        name: "\u200B",
                        value: "**5.**輸入 `A WB new <頁面網址>` (用您複製的內容取代 `<頁面網址>`)\n舉例:\n`A WB new https://stats.warbrokers.io/players/i/5de3a718bfea714d3b292bcb`",
                    },
                    {
                        name: "\u200B",
                        value: "**6.**恭喜完成帳號連結~ 您現在可以使用 `kd` 指令來查看自己的 KD\n",
                    }
                );
                message.reply({ embeds: [embed] }).then(_ => message_.delete());
            });
        };
    }
} as ICommand;