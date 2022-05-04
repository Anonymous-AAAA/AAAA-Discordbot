import { Client } from 'discord.js';
import info from '../resources/info';
import { cheerio, readgameID, request } from '../resources/functions/.export.functions';
import { MessageActionRow, MessageButton } from 'discord.js';


export default (client: Client) => {
    client.on('messageCreate', (message) => {
        if (message.content.toLowerCase() == 'kd') {
            let authorName = message.author;
            let authorID = message.author.id;
            message.channel.send({
                embeds: [{
                    color: "#FF0000",
                    description: '***This might take a few seconds . . .***',
                    footer: {
                        text: `Bot \`V ${info.release.botVersion}\``
                    },
                    timestamp: new Date(),
                }]
            }).then(preMessage => {
                message.delete();
                readgameID(authorID).then(callback => {
                    switch (callback.errcode) {
                        case 0:
                            preMessage.delete();
                            preMessage.channel.send({
                                embeds: [{
                                    color: "#FF0000",
                                    title: `***Command failed with unexpected error !***`,
                                    description: '"Please contact `꧁AAAA꧂#2713` if kept facing this error"',
                                    footer: {
                                        text: `Bot \`V ${info.release.botVersion}\``
                                    },
                                    timestamp: new Date(),
                                }]
                            });
                            break;

                        case 1:
                            request(`https://stats.warbrokers.io/players/i/${callback.gameID}`, (error, response, html) => {
                                if (!error && response.statusCode == 200) {
                                    let $ = cheerio.load(html);
                                    let gameName_long = $("head > title").text().toString();
                                    let gameName = gameName_long.replace(' - War Brokers', '');
                                    let kills = Number($("#player-details-summary-grid > div:nth-child(2) > div.player-details-number-box-value").text().replace(/,/g, "").replace(/\n/g, "").replace(/ /g, ""));
                                    let deaths = Number($("#player-details-summary-grid > div:nth-child(3) > div.player-details-number-box-value").text().replace(/,/g, "").replace(/\n/g, "").replace(/ /g, ""));
                                    let currentKD = (kills / deaths);
                                    let rounded_currentKD = Math.round(currentKD * 10) / 10;
                                    let nextKD = (rounded_currentKD + 0.05);
                                    let neededKills = (nextKD * deaths - kills);
                                    let rounded_neededKills = Math.round(neededKills * 1) / 1;
                                    let KDdrop = (rounded_currentKD - 0.06);
                                    let neededDeaths = (kills / KDdrop - deaths);
                                    let rounded_neededDeaths = Math.round(neededDeaths * 1) / 1;

                                    const statsRow = new MessageActionRow()
                                        .addComponents(
                                            new MessageButton()
                                                .setStyle('LINK')
                                                .setLabel(`${gameName}`)
                                                .setURL('https://stats.warbrokers.io/players/i/${callback.gameID}')
                                                .setDisabled(false)
                                        );
                                    
                                    preMessage.delete();
                                    preMessage.channel.send({
                                        content: `${authorName}, 這是您的 KD 數據`,
                                        embeds: [{
                                            color: "#fccbcb",
                                            title: `玩家名稱 : ${gameName}`,
                                            fields: [
                                                {
                                                    name: ('您的 KD 值 : `' + rounded_currentKD + '`'),
                                                    value: (`您需要 \`${rounded_neededKills}\` 次擊殺來增加 KD 值\n您可以在 KD 值下降之前死亡 \`${rounded_neededDeaths}\` 次`),
                                                    inline: true
                                                },
                                                {
                                                    name: ('目前狀況 :'),
                                                    value: (`擊殺次數 = \`${kills}\`\n死亡次數 = \`${deaths}\``),
                                                }
                                            ],
                                            footer: {
                                                text: `Bot \`V ${info.release.botVersion}\``
                                            },
                                            timestamp: new Date(),
                                        }],
                                        components: [statsRow]
                                    });
                                };
                            });
                            break;

                        case 2:
                            preMessage.edit({
                                embeds: [{
                                    color: "#ff0000",
                                    title: "***您似乎尚未連結帳號 ?***",
                                    fields: [
                                        {
                                            name: "**連結方式 :**",
                                            value: "WBnew <頁面網址>",
                                        },
                                        {
                                            name: "**舉例 :**",
                                            value: "`WB new https://stats.warbrokers.io/players/i/5de3a718bfea714d3b292bcb`",
                                        },
                                        {
                                            name: "***需要幫助 ?***",
                                            value: "輸入 `WBnew help` 以獲得更多資訊",
                                        }
                                    ],
                                    footer: {
                                        text: `Bot \`V ${info.release.botVersion}\``
                                    },
                                    timestamp: new Date(),
                                }]
                            });
                            break;

                        default:
                            preMessage.delete();
                            preMessage.channel.send({
                                embeds: [{
                                    color: "#FF0000",
                                    title: `***Command failed with unexpected error !***`,
                                    description: '"Please contact `꧁AAAA꧂#2713` if kept facing this error"',
                                    footer: {
                                        text: `Bot \`V ${info.release.botVersion}\``
                                    },
                                    timestamp: new Date(),
                                }]
                            });
                            break;
                    };
                });
            });
        };
    });
};

export const config = {
    // The display name that server owners will see.
    // This can be changed at any time.
    displayName: "warbrokers",

    // The name the database will use to set if it is enabled or not.
    // This should NEVER be changed once set, and users cannot see it.
    dbName: "null"
};