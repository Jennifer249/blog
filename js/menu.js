var otherJS = 'js/jquery.min.js';//引入jquery.js
document.write('<scr' + 'ipt type="text/javascript" src="'+ otherJS +'"></scr' + 'ipt>');
class Menu {
	constructor(id) {
		this.box = document.querySelector(id); //class:header-main
		this.menuToggle = this.box.querySelector(".menu-toggle");
		this.init();
	}

	init() {
		this.menuToggle.addEventListener("click", (e) => {
			$(".header-main").slideToggle(300); //实现上滑、下滑特效
			if(this.menuToggle.classList.contains("x")) {
				this.menuToggle.classList.remove("x");
			}
			else {
				this.menuToggle.classList.add("x");
			}
		});

		window.addEventListener('resize', function() {
			var offsetWid = document.documentElement.clientWidth;
			var mt = document.getElementsByClassName("menu-toggle");
			var hm = document.getElementsByClassName("header-main");

			// 减去右侧滚动条的宽度
			if(offsetWid > (767 - getScrollbarWidth())) { 
				mt[0].classList.remove("x");
				hm[0].style.display = "";
			}
		})
	}
}

// 计算右侧滚动条的宽度
function getScrollbarWidth() { 
	var oP = document.createElement('p'),
	styles = {
		width: '100px',
		height: '100px',
		overflowY: 'scroll'
	}, i, scrollbarWidth;
	for (i in styles) oP.style[i] = styles[i];
		document.body.appendChild(oP);
	scrollbarWidth = oP.offsetWidth - oP.clientWidth;
	oP.remove();
	return scrollbarWidth;
}