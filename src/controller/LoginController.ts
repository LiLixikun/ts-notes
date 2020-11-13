import path from 'path'
import fs from 'fs'
import { Context, Next } from 'koa'
import controller from '../decorator/controller'
import { GET, POST } from '../decorator/request'
import { use } from '../decorator/use'

const checkLogin = (ctx: Context, next: Next) => {
    if (false) {
        next()
    } else {
        console.log('中间件拦截');
    }
}

@controller
class Test {
    @POST('/login')
    login() {
        console.log('调用登录接口');
    }

    @GET('/logout')
    @use(checkLogin)
    logout() {
        console.log('调用logout接口');
    }

    @GET('/getData')
    getData(ctx: Context) {
        const data = fs.readFileSync(path.resolve(__dirname, '../../data/data.json'), "utf-8")
        ctx.body = data
    }
}