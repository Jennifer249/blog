const jwt = require('jsonwebtoken');
const tokenInfo = require('./token');
const db = require('../db/db');

const verify = {
	// 设置token
    setToken(_id) {
        return new Promise(resolve => {
            let token = jwt.sign(
            	// 存储数据，自定义
                {_id},
                // 密钥
                tokenInfo.secret,
                // 过期时间
                { expiresIn: setting.tokenInfo.expireIn }
            )
            resolve(token)
        })
    },
    getToken(token) {
        return new Promise((resolve, reject) => {
            // 判断token是否存在，这里是根据空格分割
            if(!token.split(' ').length){
                reject({error: 'The token value is empty'});
            }else{
                // 解密token并返回数据
                 let data = jwt.verify(token.split(' ')[1], tokenInfo.secret);
                 resolve(data);
            }
		})
    }
}

module.exports = verify;