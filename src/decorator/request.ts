
export enum Method {
    get = 'get',
    post = 'post',
    put = 'put',
    delete = 'delete'
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