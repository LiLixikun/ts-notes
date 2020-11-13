import Router from 'koa-router'

export function use(middleware: Router.IMiddleware) {
    return function (target: any, key: string) {
        Reflect.defineMetadata('middleware', middleware, target, key);
    };
}