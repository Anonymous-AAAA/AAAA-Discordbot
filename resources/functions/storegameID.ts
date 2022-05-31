import { axios, cheerio, schema_gameID } from './.export.functions';


export async function storegameID(authorID: string, gameID: string) {
    let errcode = 0;
    try {
        let data = await schema_gameID.findOne({ discordID: authorID }).exec();
        if (data == null) {
            let code = await axios.request({
                method: "GET",
                url: `https://stats.warbrokers.io/players/i/${gameID}`,
            }).then(async (response) => {
                let $ = cheerio.load(response.data);
                let gameName_long = $("head > title").text().toString();
                let gameName = gameName_long.substring(0, gameName_long.length - 14);
                if (gameName.length > 0) {
                    await new schema_gameID({
                        discordID: authorID,
                        gameID: gameID
                    }).save();
                    return 1;
                }
                else {
                    return 3;
                };
            });
            return errcode = code;
        }
        else if (data.discordID == authorID) {
            return errcode = 2;
        };
    } catch (error) {
        return errcode;
    };
}