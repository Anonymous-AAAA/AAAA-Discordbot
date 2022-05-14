import { path } from './functions/.export.functions';


export default {
    commandsDir: path.join(__dirname, "..", "commands"),
    featuresDir: path.join(__dirname, "..", "features"),
    packagejson: path.join(__dirname, "..", "package.json"),
    playerIDjson: path.join(__dirname, "playerID.json"),
};