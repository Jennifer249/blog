module.exports = {
    secret: 'czl_blog',
    expiresIn: '1h',
    header: 'authorization',
    unRoute: [
        { url: '/api/login', methods: ['POST']},
        { url: /public/, methods: ['GET']},
        { url: /\/api\/share\//},
        { url: /\/api\/front\//}
    ]
}