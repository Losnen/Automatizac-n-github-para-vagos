import "babel-polyfill";
import github from 'octonode';
import inquirer from 'inquirer';
import fs from 'fs';
import { readToken } from './codigo';

const borrar = async (repo) => {

    if (!fs.existsSync(process.env.HOME + '/.automatizacion-para-vagos/token.json')) {
        console.log(' ');
        console.log('Todavía no ha generado su token, primero ejecute automatizacion-vagos -i | --init');
        console.log(' ');
        console.log('Para mas información, ejecute automatizacion-vagos -h');
        console.log(' ');
    } else {
        let token = readToken();
        await borrarRepo(repo,token);
    }
}

function borrarRepo(repo,token) {

    return new Promise((resolve, reject) => {

        let client = github.client(token);
        let ghrepo = client.repo(repo);
        ghrepo.destroy();

    });
}

export { borrar };