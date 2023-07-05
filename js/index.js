window.addEventListener("DOMContentLoaded", function(){
	//인덱스 스와이퍼
	let mainCurrent, mainTotal;
	mainStart=document.getElementById("start");
	const progressCircle = document.querySelector("#start .autoplay-progress svg");
	const progressContent = document.querySelector("#start .autoplay-progress span");
	let mainSwiper = new Swiper("#start .mySwiper", {
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
});