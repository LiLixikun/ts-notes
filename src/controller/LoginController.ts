import path from 'path'
import fs from 'fs'
import { Context, Next } from 'koa'
import controller from '../decorator/controller'
import { GET, POST, Query, Param } from '../decorator/request'
import { use } from '../decorator/use'

const checkLogin = (ctx: Context, next: Next) => {
    if (true) {
        next()
    } else {
        console.log('中间件拦截');
    }
}

const test = (ctx: Context, next: Next) => {
    ctx.test = "挂值"
    next()
}

@controller('/user')
class Test {
    @GET('/login')
    login(@Query("age") age: number, @Query("name") name: string, ctx: Context) {
        console.log(age, name);
        ctx.body = "调用登录接口"
    }

    @GET('/logout')
    @use(checkLogin)
    @use(test)
    logout(ctx: Context) {
        console.log('调用logout接口');
        console.log(ctx.test)
    }

    @GET('/getData/:id')
    getData(@Param("id") id: number, ctx: Context) {
        console.log(id);
        const data = fs.readFileSync(path.resolve(__dirname, '../../data/data.json'), "utf-8")
        ctx.body = data
    }
}