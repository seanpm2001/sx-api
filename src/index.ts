import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import graphql from './graphql';
import Checkpoint from './checkpoint';
import config from './config.json';
import * as writer from './writer';

const checkpoint = new Checkpoint(config, writer);
checkpoint.start();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: '4mb' }));
app.use(bodyParser.urlencoded({ limit: '4mb', extended: false }));
app.use(cors({ maxAge: 86400 }));
app.use('/', graphql);

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
