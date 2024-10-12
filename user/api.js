import { Router } from 'express';
import {
    readFileSync, existsSync, writeFileSync, appendFileSync
} from 'fs';
import Logger from '../util/log/winston.js';

const usersRouter = Router();

usersRouter.post('', (req, res) => {
    if (!req.body.nom || !req.body.prenom || !req.body.email) {
        Logger.error(`Missing fields`);
        res.status(400).send('Missing fields');
        return;
    }
    if (!existsSync("./data.csv"))
        writeFileSync("./data.csv", "Nom,Prénom,Email");
    appendFileSync(
        "./data.csv",
        `\n${req.body.nom},${req.body.prenom},${req.body.email}`
    );
    Logger.info(req.body);

    res.status(200).redirect('/users.html');
})


usersRouter.get("", (req, res) => {
    const csvBuffer = readFileSync("./data.csv");
    const users =
        csvBuffer
            .toString()
            .split("\n")
            .slice(1)
            .map((row) => row.split(","))
            .map(([nom, prenom, email]) => ({ nom, prenom, email }))
    res.status(200).render("users", { users });
});

export default usersRouter;
