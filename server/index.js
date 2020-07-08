const express = require('express');
const expressJwt = require('express-jwt');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const routes = require('./api');
const tokenInfo = require('./token/token');

app.set('port', (process.env.port || 3000));
// 解析以 application/json 和 application/x-www-form-urlencoded 提交的数据
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
//跨域请求中间件
app.use(cors());

//静态资源
app.use('/public', express.static(path.join(__dirname, 'public')));

//验证token是否过期并规定哪些路由不用验证
app.use(expressJwt({
	secret: tokenInfo.secret
}).unless({
	path: tokenInfo.unRoute
}));

//当token失效返回提示信息
app.use((err, req, res, next) => {
    if (err.status === 401) {
        return res.status(err.status).json({
            status: err.status,
            message: 'The token is invalid',
            error: err.name + ':' + err.message
        })
    }
});

routes(app);

app.listen(app.get('port'), () => {
	console.log('I \'m listening on port ' + app.get('port'));
})