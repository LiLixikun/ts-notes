import 'reflect-metadata'
import Router from 'koa-router'

export function use(middleware: Router.IMiddleware) {
    return function (target: any, key: string) {
        const originMiddlewares = Reflect.getMetadata('middlewares', target, key) || []
        originMiddlewares.push(middleware)
        Reflect.defineMetadata('middlewares', originMiddlewares, target, key);
    };
}