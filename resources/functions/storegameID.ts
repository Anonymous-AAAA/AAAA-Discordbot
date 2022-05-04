import { fs } from './.export.functions';
import { Filepath } from '../Filepath'


export async function storegameID(authorID: string, gameID: string) {
    let errcode = 0;
    let data = {
        discordID: authorID,
        gameID: gameID
    };
    if (JSON.parse(Object(fs.readFileSync(Filepath.playerIDjson))).some((obj: { discordID: string; }) => obj.discordID == authorID)) {
        errcode = 2;
    }
    else if (!(JSON.parse(Object(fs.readFileSync(Filepath.playerIDjson))).some((obj: { discordID: string; }) => obj.discordID == authorID))) {
        fs.readFile(Filepath.playerIDjson, (err: any, olddata) => {
            if (err) throw err;
            var json = JSON.parse(Object(olddata));
            json.push(data);
            fs.writeFile(Filepath.playerIDjson, JSON.stringify(json, null, 4), (err: any) => {
                if (err) throw err;
            });
        });
        errcode = 1;
    };
    return errcode;
}