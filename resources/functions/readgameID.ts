import { schema_gameID } from './.export.functions';


export async function readgameID(authorID: string) {
    let errcode = 0;
    let gameID = '';
    let data = await schema_gameID.findOne({ discordID: authorID }).exec();
    if (data) {
        errcode = 1;
        gameID = data.gameID;
    }
    else if (data == null) {
        errcode = 2;
    };
    return {
        errcode: errcode,
        gameID: gameID
    };
}