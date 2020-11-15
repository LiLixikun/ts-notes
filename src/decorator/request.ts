import { Context } from 'koa'

export enum Method {
    get = 'get',
    post = 'post',
    put = 'put',
    delete = 'delete'
}

export interface paramType {
    name: string,
    fn: (ctx: Context) => any,
    index: number
}

function getRequestDecorator(type: string) {
    return function (path: string) {
        return function (target: any, propertyKey: string) {
            Reflect.defineMetadata('path', path, target, propertyKey)
            Reflect.defineMetadata('method', type, target, propertyKey)
        }
    }
}

export const GET = getRequestDecorator('get');
export const POST = getRequestDecorator('post');
export const PUT = getRequestDecorator('put');
export const DEL = getRequestDecorator('delete');


function getParamDecorator(fn: any) {
    return function (target: any, name: string, paramIndex: number) {
        const preMetadata: Array<paramType> = Reflect.getMetadata('param', target, name) || [];
        preMetadata.push({
            name,
            fn,
            index: paramIndex,
        })
        Reflect.defineMetadata('param', preMetadata, target, name)
    }
}


export const Query = (arg: string) => getParamDecorator((ctx: Context) => ctx.query[arg]);
export const Param = (arg: string) => getParamDecorator((ctx: Context) => ctx.params[arg]);
export const Body = () => getParamDecorator((ctx: Context) => ctx.request.body);
export const Req = () => getParamDecorator((ctx: Context) => ctx.req);
export const Res = () => getParamDecorator((ctx: Context) => ctx.res);