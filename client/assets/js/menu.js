var otherJS = 'js/jquery.min.js';//引入jquery.js
document.write('<scr' + 'ipt type="text/javascript" src="'+ otherJS +'"></scr' + 'ipt>');

var scrollWidth = getScrollbarWidth();

class Menu {
	constructor(id) {
		this.box = document.querySelector(id); //class:header-main
		this.menuToggle = this.box.querySelector(".menu-toggle");
		this.init();
	}

	init() {
		this.menuToggle.addEventListener("click", (e) => {
			let clic = e.target;
			$(".header-main").slideToggle(300); //实现上滑、下滑特效
			if(clic.classList.contains("x")) {
				clic.classList.remove("x");
			}
			else {
				clic.classList.add("x");
			}
		});

		window.addEventListener('resize', function() {
			var offsetWid = document.documentElement.clientWidth;

			// 减去右侧滚动条的宽度
			if(offsetWid > (767 - scrollWidth)) { 
				var mt = document.querySelector(".menu-toggle");
				var hm = document.querySelector(".header-main");
				mt.classList.remove("x");
				hm.style.display = "";
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