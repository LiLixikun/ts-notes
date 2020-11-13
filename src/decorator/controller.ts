import 'reflect-metadata'
import { Method } from './request'
import router from '../router'

export default function controller(target: any) {
    for (const key in target.prototype) {
        const handle = target.prototype[key]
        const path = Reflect.getMetadata('path', target.prototype, key)
        const method: Method = Reflect.getMetadata('method', target.prototype, key)
        const handler = target.prototype[key];
        const middleware = Reflect.getMetadata('middleware', target.prototype, key);
        if (path && method && handler) {
            if (middleware) {
                router[method](path, middleware, handle)
            } else {
                router[method](path, handle)
            }
        }
    }
}




