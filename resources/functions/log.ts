import { TextChannel } from 'discord.js';
import { TWtime } from './.export.functions';
import info from '../info';


export function logToDiscord(client: any, message: string) {
    let channel = client.channels.cache.get("971538779720536154") as TextChannel;
    channel.send(`**\`[${TWtime().full}] | ${info.dev.platform} | Bot V ${info.dev.botVersion}:\`** ` + message);
};