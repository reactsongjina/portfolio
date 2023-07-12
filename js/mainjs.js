window.addEventListener("DOMContentLoaded", function(){
	//메인 스와이퍼
	const progressCircle = document.querySelector("#page1 .autoplay-progress svg");
	const progressContent = document.querySelector("#page1 .autoplay-progress span");
	let mainSwiper = new Swiper("#page1 .mySwiper", {
		slidesPerView: 1,
		loop: true,
		speed: 1200,
		autoplay: {
			delay: 4500,
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: ".next_btn",
			prevEl: ".prev_btn",
		},
		on: {
			autoplayTimeLeft(s, time, progress) {
					progressCircle.style.setProperty("--progress", 1 - progress);
					progressContent.textContent = `${Math.ceil(time / 1000)}s`;
				},
		}
	});

	//스크롤 애니메이션
	let n=0;
	let prevN;
	let winHalf;
	let pages=document.getElementsByTagName("section");

	let init=() => {
		winHalf=window.innerHeight*0.75;
	};
	init();
	window.addEventListener("resize", init);

	function scrollInteraction(t){
		console.log(n)
		if(t < pages[1].offsetTop-winHalf){
			n=0;
		}
		else if(t < pages[2].offsetTop-winHalf){
			n=1;
		}
		else if(t < pages[3].offsetTop-winHalf){
			n=2;
		}
		else if(t < pages[4].offsetTop-winHalf){
			n=3;
		}
		else{
			n=4;
		}

		if(t>200){
			header.classList.add("active");
		}else{
			header.classList.remove("active");
		}

		if(n === prevN) return;
		prevN=n;

		for(let i=0; i<gnbList.length; i++){
			if(i === n){
				if(gnbList[i].classList.contains("on") === false) gnbList[i].classList.add("on");
			}
			else{
				if(gnbList[i].classList.contains("on") === true) gnbList[i].classList.remove("on");
			}
		}
	}

	//gnb
	let body=document.getElementsByTagName("body")[0];
	let header=document.getElementById("header");
	let gnb=document.getElementById("gnb");
	let gnbToggle=gnb.firstElementChild;
	let gnbList=gnb.getElementsByTagName("UL")[0].children;

	for(let i=0; i<gnbList.length; i++){
		gnbList[i].addEventListener("click", e => {
			e.preventDefault();
			n=i;
			let targety=pages[n].offsetTop;

			if(gnb.classList.contains("on")){
				body.classList.remove("fixed");
				gnb.classList.remove("on");
				gnb.removeAttribute("style");
				gnbToggle.firstElementChild.setAttribute("class","fa-regular fa-bars");

				setTimeout(() => {
					gsap.to(window, {scrollTo: targety, duration: 0.5});
				}, 500);
			}
			else{
				gsap.to(window, {scrollTo: targety, duration: 0.5});
			}
		});
	}
	//gnb 토글버튼
	gnbToggle.addEventListener("click", function(e){
		if(body.classList.contains("fixed")){
			body.classList.remove("fixed");
			gnb.classList.remove("on");
			gnbToggle.firstElementChild.setAttribute("class","fa-regular fa-bars");
		}else{
			body.classList.add("fixed");
			gnb.classList.add("on");
			gnbToggle.firstElementChild.setAttribute("class","fa-regular fa-x");
		}
	});

	for(let i=0; i<gnbList.length; i++){
		gnbList[i].addEventListener("click", e => {
			e.preventDefault();
			n=i;
			let targety=pages[n].offsetTop;

			if(gnb.classList.contains("on")){
				body.classList.remove("fixed");
				gnb.classList.remove("on");
				gnb.removeAttribute("style");
				gnbToggle.firstElementChild.setAttribute("class","fa-regular fa-bars");

				setTimeout(() => {
					gsap.to(window, {scrollTo: targety, duration: 0.5});
				}, 500);
			}
			else{
				gsap.to(window, {scrollTo: targety, duration: 0.5});
			}
		});
	}

	const trigger=new ScrollTrigger.default({
		trigger: {
			once: true,
			toggle: {
				class: {
					in: "visible",
					out: "invisible"
				}
			},
			offset: {
				viewport: {
					x: 0,
					y: 0.25
				}
			}
		},
		scroll: {
			element: window,
			callback: (offset, dir) => { scrollInteraction(offset.y); }
		}
	});
	trigger.add("section[id^=page]");

	//#page2 skill 탭메뉴
	let page2=document.getElementById("page2");
	let skill=page2.firstElementChild.querySelector(".bottom").querySelector(".skill");
	let skillList=skill.children;
	
	skillList[0].classList.add("on");
	for(let i=0; i<skillList.length; i++){
		skillList[i].addEventListener("click", function(){
			for(let j=0; j<skillList.length; j++){
				if(i===j){
					skillList[j].classList.add("on");
				}else{
					skillList[j].classList.remove("on");
				}
			}
		});
	}


	//#page3 History 스와이퍼
	let page3swiper = new Swiper("#page3 .mySwiper", {
		slidesPerView: 1,
		centeredSlides: false,
		slidesPerGroupSkip: 1,
		grabCursor: true,
		keyboard: {
		enabled: true,
		},
		speed: 600,
		breakpoints: {
			1669: {
				slidesPerView: 3,
				slidesPerGroup: 3,
			},
			1230: {
				slidesPerView: 2,
				slidesPerGroup: 3,
			},
		},
		scrollbar: {
		el: ".swiper-scrollbar",
		},
		navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
		},
		pagination: {
		el: ".swiper-pagination",
		clickable: true,
		},
	});


});
