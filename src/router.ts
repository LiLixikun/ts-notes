import { Context } from 'koa'
import Router from 'koa-router'
import path from 'path'
import fs from 'fs'

const router = new Router();

interface MyContext extends Context {
    body: {
        [key: string]: string | undefined;
    }
}

router.get("/", (ctx: MyContext) => {
    ctx.body.teacher = "112"
})

router.get("/getData", (ctx: Context) => {
    const data = fs.readFileSync(path.resolve(__dirname, '../data/data.json'), "utf-8")
    ctx.body = data
})

export default router