import koa from 'koa'
import './controller/index'
import bodyParser from 'koa-bodyparser'
import router from './router'

const app = new koa()
app.use(bodyParser())
app.use(router.routes())
app.listen("8003", () => {
    console.log('app run 8003 🐒');
})


