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
	let [page1,page2,page3,page4,page5]=pages;

	let init=() => {
		winHalf=window.innerHeight*0.75;
	};
	init();
	window.addEventListener("resize", init);

	function scrollInteraction(t){
		//console.log(n)
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

	//page4 worklist 스와이퍼
	let workSwiper = new Swiper("#page4 .worklist .mySwiper", {
		slidesPerView: 4,
		spaceBetween: 30,
		loop: true,
		pagination: {
		el: ".swiper-pagination",
		clickable: true,
		},
		breakpoints: {
			1230: {
				slidesPerView: 3,
			},
			630: {
				slidesPerView: 2,
			},
			0: {
				slidesPerView: 1,
			},
		},
		navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
		},
	});

	//page4 worklist 모달창
	let modal=document.getElementById("modal");
	let [modalImgbox,modalDesc]=modal.firstElementChild.children;
	let modalDescP=modalDesc.getElementsByTagName("P")[0];
	let modalDescSpan=modalDesc.getElementsByTagName("SPAN")[0];
	let modalFicture=modal.getElementsByTagName("IMG")[0];
	let [top,bottom]=page4.firstElementChild.children;
	let [pofolist,worklist]=bottom.children;
	let [workTit,workDesc]=worklist.children;
	let workSwipeWrapper=workDesc.firstElementChild.firstElementChild;
	let workSlide=workSwipeWrapper.children;

	const modalData=[
		{src:"./images/pc_printed_1.jpg", alt:"워크리스트1", p:"2021 남사당놀이 관악지부 예토 Wall&Moon 공연", span:"포스터, 리플렛 제작"},
		{src:"./images/pc_printed_2.jpg", alt:"워크리스트2", p:"포엔 EV 배터리팩 리퍼비시 서비스", span:"리플렛 제작"},
		{src:"./images/pc_printed_3.jpg", alt:"워크리스트3", p:"제 3회 빛가람 청렴문화제 팀작업", span:"포스터1안/현수막"},
		{src:"./images/pc_printed_4.jpg", alt:"워크리스트4", p:"국기로 떠나는 아시아", span:"교구 시안 작업"},
		{src:"./images/pc_printed_5.jpg", alt:"워크리스트5", p:"상상모리 길동", span:"옥외 간판 및 인쇄물작업"},
		{src:"./images/pc_printed_1.jpg", alt:"워크리스트1", p:"2021 남사당놀이 관악지부 예토 Wall&Moon 공연", span:"포스터, 리플렛 제작"},
		{src:"./images/pc_printed_2.jpg", alt:"워크리스트2", p:"포엔 EV 배터리팩 리퍼비시 서비스", span:"리플렛 제작"},
		{src:"./images/pc_printed_3.jpg", alt:"워크리스트3", p:"제 3회 빛가람 청렴문화제 팀작업", span:"포스터1안/현수막"},
		{src:"./images/pc_printed_4.jpg", alt:"워크리스트4", p:"국기로 떠나는 아시아", span:"교구 시안 작업"},
		{src:"./images/pc_printed_5.jpg", alt:"워크리스트5", p:"상상모리 길동", span:"옥외 간판 및 인쇄물작업"},
	];

	for(let i=0; i<workSlide.length; i++){
		workSlide[i].addEventListener("click", e => {
			e.preventDefault();
			body.classList.add("fixed");
			modal.style.display="block";
			modalFicture.setAttribute("src",modalData[i].src);
			modalFicture.setAttribute("alt",modalData[i].alt);
			modalDescP.innerHTML=modalData[i].p;
			modalDescSpan.innerHTML=modalData[i].span;
		});
	}
	modal.addEventListener("click", () => {
		body.classList.remove("fixed");
		modal.style.display="none";
	});

});
