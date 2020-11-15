import 'reflect-metadata'
import Router from 'koa-router'
import { Context } from 'koa'
import { Method, paramType } from './request'
import router from '../router'

function runHandler(params: Array<paramType>, ctx: Context, handler: Function) {
    if (params.length) {
        const args = params.map(item => item.fn(ctx))
        handler(...args, ctx)
    } else {
        handler(ctx)
    }
}

export default function controller(prefix: string) {
    return function (target: new (...args: any[]) => any) {
        for (const key in target.prototype) {
            let path: string = Reflect.getMetadata('path', target.prototype, key)
            // get request path
            const method: Method = Reflect.getMetadata('method', target.prototype, key)
            const handler = target.prototype[key];
            // get middleware
            const middlewares: Router.IMiddleware[] = Reflect.getMetadata('middlewares', target.prototype, key);

            // get params
            let params: Array<paramType> = Reflect.getMetadata('param', target.prototype, key) || []

            // 根据传入的参数顺序进行排序
            if (params.length) {
                params = params.sort((a: paramType, b: paramType) => a.index - b.index);
            }

            if (path && method && handler) {
                path = prefix === '/' ? path : `${prefix}${path}`
                if (middlewares && middlewares.length) {
                    router[method](path, ...middlewares, (ctx: Context) => {
                        runHandler(params, ctx, handler)
                    })
                } else {
                    router[method](path, (ctx: Context) => {
                        runHandler(params, ctx, handler)
                    })
                }
            }
        }
    }
}






