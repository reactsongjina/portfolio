window.addEventListener("DOMContentLoaded", function(){

    function scrollInteraction(t){
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
					y: 0.25
				}
			}
		},
		scroll: {
			element: window,
			callback: (offset, dir) => { scrollInteraction(offset.y); }
		}
	});
	trigger.add("section[id^=port]");
});