import koa from 'koa';
import KoaLogger from "koa-logger";
import { koaBody } from "koa-body";
import router from './routes.js';
import dotenv from 'dotenv';

dotenv.config();

import mongoose from 'mongoose';

const db = mongoose.connection;
const host = process.env.HOST;
mongoose.connect(host);

db.on('error', (err) => console.log('Error, DB Not connected'));
db.on('connected', () => console.log('Connected to mongo'));
db.on('disconnected', () => console.log('Mongo is disconnected'));
db.on('open', () => console.log('Connection Made!'));


const app = new koa();

app.use(KoaLogger());
app.use(koaBody());

app.use(router.routes());

app.use((ctx) => {
  ctx.body = "Hello world"
})

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Listening on port", port);
})
