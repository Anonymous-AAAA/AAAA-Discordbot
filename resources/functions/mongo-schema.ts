import mongoose from "mongoose";


const Schema = mongoose.Schema;

const storegameID = new Schema({
    discordID: String,
    gameID: String,
});

export const schema_gameID = mongoose.model("gameID", storegameID, "gameIDs");