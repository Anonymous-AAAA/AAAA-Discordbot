import { TextChannel } from 'discord.js';
import { TWtime } from './.export.functions';
import info from '../info';


export function logToDiscord(client: any, message: string, dev?: boolean) {
    dev = dev || false;
    let channel = client.channels.cache.get("971538779720536154") as TextChannel;
    channel.send(`**\`[${TWtime().full}] | ${dev ? info.dev.platform : info.release.platform} | Bot V ${dev ? info.dev.botVersion : info.release.botVersion}:\`** ` + message);
};