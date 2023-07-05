window.addEventListener("DOMContentLoaded", function(){

	let body=document.getElementsByTagName("body")[0];
	let gnbWrap=document.querySelector(".gnbwrap")
	let gnbToggle=gnbWrap.firstElementChild;
	let gnb=document.getElementById("gnb");

	//gnb
	gnbToggle.addEventListener("click", function(e){
		if(body.classList.contains("fixed")){
			body.classList.remove("fixed");
			gnbWrap.classList.remove("on");
			e.currentTarget.classList.remove("on");
			gnb.removeAttribute("style");
		}else{
			body.classList.add("fixed");
			gnbWrap.classList.add("on");
			e.currentTarget.classList.add("on");
			gnb.style.display="block";
		}
	});

	//스크롤 애니메이션
	function scrollInteraction(t){
		//console.log(t);
		if(t>200){
			header.classList.add("active");
		}else{
			header.classList.remove("active");
		}
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
					y: -0.25
				}
			}
		},
		scroll: {
			element: window,
			callback: (offset, dir) => { scrollInteraction(offset.y); }
		}
	});
	trigger.add("section[id^=page] .inner, section[id^=port] .inner");

	//#page3 career 스와이퍼
	let page3swiper = new Swiper("#page3 .mySwiper", {
		slidesPerView: 1,
		centeredSlides: false,
		slidesPerGroupSkip: 1,
		grabCursor: true,
		keyboard: {
		enabled: true,
		},
		breakpoints: {
		769: {
			slidesPerView: 3,
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

	//#page4 portfolio 스와이퍼
	let page4swiper = new Swiper("#page4 .mySwiper", {
		pagination: {
			el: ".swiper-pagination",
			type: "fraction",
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});
	
	//#page6 contact .phone
	//모바일 아이콘 클릭시 배경이미지 전환
	let phoneWrap=document.querySelector(".phone_wrap");
	let phone=phoneWrap.firstElementChild;
	let [phoneMain, phoneCall, phoneEmail, phoneFigma, phoneBtn, goHome]=phone.children;
	let phoneLi=[phoneCall, phoneEmail, phoneFigma];
	let phoneBtnLi=phoneBtn.children;

	for(let i=0; i<phoneBtnLi.length; i++){
		phoneBtnLi[i].addEventListener("click", function(){
			for(let j=0; j<phoneBtnLi.length; j++){
				if(i === j){
					phoneLi[j].classList.add("on");
				}else{
					phoneLi[j].classList.remove("on");
				}
			}
		});
	}
	goHome.addEventListener("click",function(){
		for(let i=0; i<phoneLi.length; i++){
			phoneLi[i].classList.remove("on");
		}
	});

	//#page6 contact #clock
	//모바일 시계만들기
	function setTime(){
		//시간객체 만들기
		let today = new Date();
		
		today.getFullYear(); //년도
		today.getMonth(); //달
		today.getDate(); //일
		today.getHours(); //시
		today.getMinutes(); //분
		today.getSeconds(); //초
		
		//시,분,초를 변수저장
		let h = today.getHours();
		let m = today.getMinutes();
		let s = today.getSeconds();
		
		m = checkTime(m);
		s = checkTime(s);
		
		//자바스크립트로 시, 분, 초 내용 출력
		document.getElementById('clock').innerHTML=h+':'+m+':'+s;
			
		//setTime함수를 0.5초 간격으로 호출함.
		let t = setTimeout(setTime,500);
	}

	//숫자가 10보다 작을 경우 앞에 '0'을 붙여주는 함수
	function checkTime(o){
		if(o<10){
			o="0"+o;
		}
		return o; //종료
	}
	setTime();


});
