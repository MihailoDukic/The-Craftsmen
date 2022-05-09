import LocomotiveScroll from 'locomotive-scroll';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".scroll-container"),
    inertia: 0.9,
    smooth: true,
    getDirection: true,
    mobile: {
        smooth: true,
        inertia: 0.8,
        getDirection: true,
        breakpoint: 0,
    },
    tablet: {
        smooth: true,
        inertia: 0.8,
        getDirection: true,
        breakpoint: 0,
    },
});


locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(".scroll-container", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".scroll-container").style.transform ? "transform" : "fixed"
});

// Code here... 
const header = gsap.timeline({
    scrollTrigger: {
        trigger: '.header',
        scroller: '.scroll-container',
        markers: true,
        start: 'top top',
        end: '+=380px',
        scrub: 1
    }
})

header.addLabel('start')
    .to('.header', { scale: 0.8, opacity: 0.5 })
    .addLabel('end')


const text = gsap.timeline({
    scrollTrigger: {
        trigger: '.what-we-do',
        scroller: '.scroll-container',
        markers: true,
        start: '-50% top',
        end: '+=2500px',
        scrub: 1,
        ease: 'elastic.InOut'
    }
})

text.addLabel('start')
    .to('.curved-text', { rotate: '180' })
    .addLabel('end')

const services = gsap.utils.toArray('.wwd-service');
services.forEach(service => {
    const serv = gsap.timeline({
        scrollTrigger: {
            trigger: service,
            scroller: '.scroll-container',
            markers: true,
            start: '-1100px top',
            end: 'auto',
            scrub: 0.9,
            ease: 'elastic.ease'
        }
    })

    serv.addLabel('start')
        .to(service.children[1], 0.5, { right: 0, x: 0, opacity: 1 })
        .to(service.children[0],0.5,  { left: 0, x: '50%',  opacity: 1})
        .addLabel('end')
})

const circles = gsap.utils.toArray('.circle'); 
circles.forEach(shape => {
    const circle  = gsap.timeline({
        scrollTrigger: {
            trigger: '.animate-team',
            scroller: '.scroll-container',
            markers: true,
            start: '-1000px top',
            end: 'auto',
            scrub: 0.9,
            ease: 'elastic.ease',
        }
    })

    circle.addLabel('start')
        .to(shape, { opacity: 1 })
        .addLabel('end')
})
// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

//watch the free video on how this demo was made
// https://www.snorkl.tv/scrolltrigger-smooth-scroll/