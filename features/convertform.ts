import { Client } from 'discord.js';
import info from '../resources/info';


export default (client: Client) => {
    client.on('messageCreate', async (message) => {
        if (!message.embeds[0]) return;
        if (message.author.id != "994134100199870556") return;
        if (message.embeds[0].title?.replace(/[0-9]+/g, "") != "簽到表單~ (#)") return;
        if (!message.embeds[0].url?.includes("https://dyno.gg/form/5165e908/submissions/")) return;

        message.delete();

        let embed = message.embeds;
        const userID = embed[0].footer?.text.replace("User ID: ", "");
        embed[0].fields.forEach((obj: { value: string; }, index: number, array: { value: any; }[]) => {
            array[index].value = obj.value.replace(/:dynoSuccess:/g, "<:dynoSuccess:994138811535720528>").replace(/:Neutral:/g, "<:Neutral:994199013681283154>");
        });
        embed[0].fields.unshift({
            name: "User ID",
            value: `${embed[0].footer?.text.replace("User ID: ", "")}`,
            inline: false
        });
        embed[0].footer = null;
        // @ts-ignore
        const webhook = await message.channel.createWebhook(message.author.username, { avatar: message.author.avatarURL() });
        webhook.send({ content: `Submissions from user <@${userID}>`, embeds: embed });
        // // @ts-ignore
        // message.channel.createWebhook("Example Webhook", { avatar: "https://i.imgur.com/p2qNFag.png" })
        // .then((wb: { url: any; }) => message.channel.send(`Here is your webhook ${wb.url}`))
        // message.channel.send({ content: `Submissions from user <@${userID}>`, embeds: embed });
    });
};

export const config = {
    // The display name that server owners will see.
    // This can be changed at any time.
    displayName: "convertform",

    // The name the database will use to set if it is enabled or not.
    // This should NEVER be changed once set, and users cannot see it.
    dbName: "null"
};