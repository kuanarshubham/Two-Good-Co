function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".smooth-scroll", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });



    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}

locomotiveAnimation();

// gsap.to(".navbar1", {
//     transform: "translateY(-28%)",
//     opacity: 0.4,
//     scrollTrigger: {
//         scroller: "#main",
//         trigger: "#page1",
//         markers: true,
//         start: "top 0",
//         end: "top -50%",
//         scrub: true    
//     } 
// });

// gsap.to(".navbar-catagory", {
//     transform: "translateY(-1000%)",
//     scrollTrigger: {
//         scroller: "#main",
//         trigger: "#page1",
//         markers: true,
//         start: "top 10%",
//         end: "top 20%",
//         scrub: true    
//     } 
// })

function playBtnAnimate() {
    var videoCon = document.querySelector("#video-container");
    var playBtn = document.querySelector("#play");

    videoCon.addEventListener("mouseenter", () => {
        gsap.to(playBtn, {
            transform: 'translate(-50%, -50%) scale(1)',
            opacity: 1
        });
    });

    videoCon.addEventListener("mouseleave", () => {
        gsap.to(playBtn, {
            transform: 'scale(0)'
        });
    });

    document.addEventListener("mousemove", (dets) => {
        gsap.to(playBtn, {
            y: dets.y,
            x: dets.x
        });
    });
}

playBtnAnimate();

function loadAniamtionH1() {
    gsap.from("#page1 h1", {
        y: 200,
        opacity: 0,
        duaration: 1,
        stagger: 0.2
    });
}

loadAniamtionH1()


function greyBlobAnimation() {
    document.querySelectorAll(".child").forEach((elem) => {

        document.addEventListener("mousemove", (dets) => {
            gsap.to(".cursor", {
                y: dets.y,
                x: dets.x
            });
        });

        elem.addEventListener("mouseenter", () => {
            gsap.to(".cursor", {
                transform: 'translate(-50%, -50%) scale(2.2)',
                opacity: 0.4,
            });
        });

        elem.addEventListener("mouseleave", () => {
            gsap.to(".cursor", {
                transform: 'scale(0)'
            });
        });
    });
}

greyBlobAnimation();