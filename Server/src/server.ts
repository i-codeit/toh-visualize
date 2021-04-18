import * as Koa from "koa";
import * as Router from "koa-router";
import {towerOfHanoi} from "./backend";
import { EventInterface } from "./eventInterface";
var serve = require('koa-static');

// Creating a new Koa server and router path
const app = new Koa();
const router = new Router();


// Currently the router accepts input from the root url
/* router.get('/', async (ctx) => {
    ctx.type = 'html';
    ctx.body = createReadStream('index.html');
}); */

app.use(serve('./public'));

// Currently the router accepts input from the root url
router.get('/toh', async (ctx) => {
    let data: EventInterface[] = [];
    let obj;
    
    // TODO: append data to json file and use it as a cache to process the data
    // fs.appendFileSync('./newCustomer.json', JSON.stringify(data));

    // Access-Control-Allow-Origin set to * to bypass browser CORS
    // since initial client is not created by the server but data requested by it
    ctx.response.set('Access-Control-Allow-Origin', '*');
    ctx.response.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, remember-me');

    obj = ctx.request.query;
    // console.log(obj.blocks);
    if (isNaN(obj.blocks) || obj.blocks > 10)
    {
        ctx.status = 500;
        ctx.body = "Provide number input <= 10";
        return;
    }
    towerOfHanoi(obj.blocks, "A", "C", "B", data);
    ctx.response.body = JSON.stringify(data);
});

app.use(router.routes());

app.listen(3001);

console.log('Server running on port 3001');