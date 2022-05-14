import { fs } from './.export.functions';
import Filepath from '../Filepath';


export async function readgameID(authorID: string) {
    let errcode = 0;
    let gameID = '';
    let data = JSON.parse(Object(fs.readFileSync(Filepath.playerIDjson))).find((obj: { discordID: string; }) => obj.discordID == authorID)
    if (data) {
        errcode = 1;
        gameID = data.gameID;
    }
    else if (!data) {
        errcode = 2;
    };
    return {
        errcode: errcode,
        gameID: gameID
    };
}