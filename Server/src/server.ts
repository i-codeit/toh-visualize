import * as Koa from "koa";
import * as Router from "koa-router";
import {towerOfHanoi} from "./backend";
import { EventInterface } from "./eventInterface";

const app = new Koa();
const router = new Router();

router.get('/*', async (ctx) => {
    let data: EventInterface[] = [];
    
    // fs.appendFileSync('./newCustomer.json', JSON.stringify(data));
    ctx.response.set('Access-Control-Allow-Origin', '*'); // = {'Access-Control-Allow-Origin': 'http://127.0.0.1:3000'};
    ctx.response.set('Access-Control-Allow-Headers', 'Content-Type, Accept, X-Requested-With, remember-me');
    
    let obj;
    obj = ctx.request.query;
    console.log(obj.blocks);
    towerOfHanoi(obj.blocks, "A", "C", "B", data);
    ctx.response.body = JSON.stringify(data);
});

app.use(router.routes());

app.listen(3000);

console.log('Server running on port 3000');