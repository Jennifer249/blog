class Menu {
	constructor(id) {
		this.box = document.querySelector(id); //class:header-main
		this.menuToggle = this.box.querySelector(".menu-toggle");
		this.headerMain = this.box.querySelector(".header-main");
		this.init();
	}

	init() {
		this.menuToggle.addEventListener("click", (e) => {
			if(this.menuToggle.classList.contains("x")) {
				this.menuToggle.classList.remove("x");
				this.headerMain.style.display = "";
			}
			else {
				this.menuToggle.classList.add("x");
				this.headerMain.style.display = "block";
			}
		});

		window.addEventListener('resize', function() {
			var offsetWid = document.documentElement.clientWidth;
			var mt = document.getElementsByClassName("menu-toggle");
			var hm = document.getElementsByClassName("header-main");
			if(offsetWid > 767) {
				hm[0].style.display = "";
				mt[0].classList.remove("x");
			}
		})
	}
}