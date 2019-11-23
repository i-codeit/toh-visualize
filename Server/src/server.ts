import * as Koa from "koa";
import * as Router from "koa-router";
import {towerOfHanoi} from "./backend";
import { EventInterface } from "./eventInterface";
// import fs = require('fs');

const app = new Koa();
const router = new Router();

/* app.use(async (ctx, next) => {
    // Log the request to the console
    console.log('Url:', ctx.url);
    // Pass the request to the next middleware function
    await next();
}); */

router.get('/*', async (ctx) => {
    let data: EventInterface[] = [];
    towerOfHanoi(4, "A", "B", "C", data);

    // fs.appendFileSync('./newCustomer.json', JSON.stringify(data));
    ctx.body = data;
});

app.use(router.routes());

app.listen(3000);

console.log('Server running on port 3000');