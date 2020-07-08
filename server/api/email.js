const nodemailer = require("nodemailer");

//定义邮箱服务器，QQ邮箱更容易配置些
let transporter = nodemailer.createTransport({
	host: 'smtp.qq.com',
	service: 'qq',
	secure: true,
	//这里需要登陆到网页邮箱中，配置SMTP和POST服务器的密码
	auth: {
		user: '249542247@qq.com',
		pass: 'hjtiwyhfobebbghb'
	}
});

exports.send = (to, subject, html, res) => {
	let mailOptions = {
		from: '249542247@qq.com',
		to: to,
		subject: subject,
		html: html
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
	        console.log(error)
	        res.status(504).end("通知邮件发送失败")
	    } else {
	        console.log("Message sent: " + info.response)
	    }
	});
}

