import { fs, axios, cheerio } from './.export.functions';
import Filepath from '../Filepath'


export async function storegameID(authorID: string, gameID: string) {
    var errcode = 0;
    let data = {
        discordID: authorID,
        gameID: gameID
    };
    if (JSON.parse(Object(fs.readFileSync(Filepath.playerIDjson))).some((obj: { discordID: string; }) => obj.discordID == authorID)) {
        errcode = 2;
    }
    else if (!(JSON.parse(Object(fs.readFileSync(Filepath.playerIDjson))).some((obj: { discordID: string; }) => obj.discordID == authorID))) {
        let code = await axios.request({
            method: "GET",
            url: `https://stats.warbrokers.io/players/i/${gameID}`,
        }).then((response) => {
            let $ = cheerio.load(response.data);
            let gameName_long = $("head > title").text().toString();
            let gameName = gameName_long.substring(0, gameName_long.length - 14);
            if (gameName.length > 0) {
                fs.readFile(Filepath.playerIDjson, (err: any, olddata) => {
                    if (err) throw err;
                    var json = JSON.parse(Object(olddata));
                    json.push(data);
                    fs.writeFile(Filepath.playerIDjson, JSON.stringify(json, null, 4), (err: any) => {
                        if (err) throw err;
                    });
                });
                return 1;
            }
            else {
                return 3;
            };
        });
        errcode = code;
    };
    return errcode;
}
