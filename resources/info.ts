import { fs, path } from './functions/.export.functions';


const version = JSON.parse(Object(fs.readFileSync(path.join(__dirname, "..", "package.json")))).version;

export default {
    release: {
        platform: 'Heroku',
        botVersion: version,
        prefix: "A ",
        convertMessyInput: "1.0.0",
    },
    dev: {
        platform: 'Terminal',
        botVersion: 'beta',
        prefix: "$ ",
    }
}