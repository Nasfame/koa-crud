const koa = require('koa')
const json = require('koa-json')
const koaRouter = require('koa-router')
const render = require('koa-ejs')
const bodyparser = require('koa-bodyparser')
const path = require('path')

const app = new koa()
const router = new koaRouter()
const port = 9897
let countries = ['India', 'UAE', 'US']

//Setting the middleware

app.use(json())
app.use(bodyparser())
app.use(router.routes()).use(router.allowedMethods())

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'layout',
    viewExt: 'html',
    cache: false,
    debug: false
})

//Routes

router.get('/test', async ctx => ctx.body = 'Router is Working')

router.get('/', async ctx => {
    await ctx.render('index', {
        title: 'Countries I love',
        countries: countries
    })
})

router.get('/add', async ctx => {
    await ctx.render('add')
})

router.post('/add', add)

//Controllers
async function add(ctx) {
    const body = ctx.request.body
    const country = body.country
    countries.push(country)
    ctx.redirect('/')
}

//App

app.use(async ctx => ctx.body = { msg: "This route is currently not developed" }) //Default

app.listen(port, () => console.log(`Server has started ${port}`))



