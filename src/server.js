import express from 'express';
import os from 'os';
import {celsiusFahrenheit, fahrenheitCelsius} from './convert.js';
import bodyParser from 'body-parser';
import { router, healthMid } from './config/system-life.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(healthMid);
app.use('/', router);
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/fahrenheit/:valor/celsius', (req, res) => {
    const { valor } = req.params;
    const celsius = fahrenheitCelsius(valor);
    res.json({ celsius, maquina: os.hostname() });
});

app.get('/celsius/:valor/fahrenheit', (req, res) => {
    const { valor } = req.params;
    const fahrenheit = celsiusFahrenheit(valor);
    res.json({ fahrenheit, maquina: os.hostname() });
});

app.get('/', (req, res) => {
    res.render('index', { valorConvertido: '', maquina: os.hostname() });
});

app.post('/', (req, res) => {
    const { valorRef, selectTemp } = req.body;
    let resultado = '';

    if (valorRef) {
        resultado = selectTemp == 1 
            ? celsiusFahrenheit(valorRef)
            : fahrenheitCelsius(valorRef);
    }

    res.render('index', {valorConvertido: resultado, "maquina": os.hostname()});

});

app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080");
});
