import koa from 'koa'
import router from './router'
const app = new koa()

app.use(router.routes())

app.listen("8003", () => {
    console.log('app run 8003');
})


