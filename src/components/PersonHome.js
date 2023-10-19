import React, { useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Nav from "../atoms/Nav";
const PersonHome = () => {
  const app = useRef();
  gsap.registerPlugin(ScrollTrigger);
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // use scoped selectors
      gsap.from(".head-text", {
        opacity: 0,
        x: -100,
        duration: 1,
        ease: "power3.inOut",
      });
      gsap.from(".sub-text", {
        rotation: 360,
        duration: 3,
        ease: "elastic",
      });
      //   gsap.to(".animation-element", { rotation: 360 });
      // or refs
      gsap.registerPlugin(ScrollTrigger);

      const slides = gsap.utils.toArray(".slide");
      const totalSlides = slides.length;
      const carousel = document.querySelector(".carousel");

      smoothScroll("#content");

      /* First Attempt */
      const scrollTween = gsap.to(slides, {
        xPercent: -100 * (totalSlides - 1),
        ease: "none",
        scrollTrigger: {
          trigger: ".carousel",
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
          end: () => "+=" + (carousel.scrollWidth + carousel.clientWidth),
        },
      });

      slides.forEach((slide, i) => {
        gsap.to(`.box-${i + 1}`, {
          left: "100%",
          scrollTrigger: {
            containerAnimation: scrollTween,
            trigger: slide,
            scrub: true,
            start: i === 0 ? "left left" : "-100px left",
            end: () => "+=" + slide.clientWidth,
          },
        });
      });

      // this is the helper function that sets it all up. Pass in the content <div> and then the wrapping viewport <div> (can be the elements or selector text). It also sets the default "scroller" to the content so you don't have to do that on all your ScrollTriggers.
      function smoothScroll(content, viewport, smoothness) {
        content = gsap.utils.toArray(content)[0];
        smoothness = smoothness || 1;

        gsap.set(viewport || content.parentNode, {
          overflow: "hidden",
          position: "fixed",
          height: "100%",
          width: "100%",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        });
        gsap.set(content, { overflow: "visible", width: "100%" });

        let getProp = gsap.getProperty(content),
          setProp = gsap.quickSetter(content, "y", "px"),
          setScroll = ScrollTrigger.getScrollFunc(window),
          removeScroll = () => (content.style.overflow = "visible"),
          killScrub = (trigger) => {
            let scrub = trigger.getTween
              ? trigger.getTween()
              : gsap.getTweensOf(trigger.animation)[0]; // getTween() was added in 3.6.2
            scrub && scrub.kill();
            trigger.animation.progress(trigger.progress);
          },
          height,
          isProxyScrolling;

        function refreshHeight() {
          height = content.clientHeight;
          content.style.overflow = "visible";
          document.body.style.height = height + "px";
          return height - document.documentElement.clientHeight;
        }

        ScrollTrigger.addEventListener("refresh", () => {
          removeScroll();
          requestAnimationFrame(removeScroll);
        });
        ScrollTrigger.defaults({ scroller: content });
        ScrollTrigger.prototype.update = (p) => p; // works around an issue in ScrollTrigger 3.6.1 and earlier (fixed in 3.6.2, so this line could be deleted if you're using 3.6.2 or later)

        ScrollTrigger.scrollerProxy(content, {
          scrollTop(value) {
            if (arguments.length) {
              isProxyScrolling = true; // otherwise, if snapping was applied (or anything that attempted to SET the scroll proxy's scroll position), we'd set the scroll here which would then (on the next tick) update the content tween/ScrollTrigger which would try to smoothly animate to that new value, thus the scrub tween would impede the progress. So we use this flag to respond accordingly in the ScrollTrigger's onUpdate and effectively force the scrub to its end immediately.
              setProp(-value);
              setScroll(value);
              return;
            }
            return -getProp("y");
          },
          scrollHeight: () => document.body.scrollHeight,
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            };
          },
        });

        return ScrollTrigger.create({
          animation: gsap.fromTo(
            content,
            { y: 0 },
            {
              y: () => document.documentElement.clientHeight - height,
              ease: "none",
              onUpdate: ScrollTrigger.update,
            },
          ),
          scroller: window,
          invalidateOnRefresh: false,
          start: 0,
          end: refreshHeight,
          refreshPriority: -999,
          scrub: smoothness,
          onRefresh: killScrub, // when the screen resizes, we just want the animation to immediately go to the appropriate spot rather than animating there, so basically kill the scrub.
        });
      }
    }, app);

    return () => ctx.revert();
  }, []);

  return (
    <div id="viewport" ref={app}>
      <div id="content">
        <Nav />
        <section className="header bg-slate-800">
          <h1 className="head-text text-gray-500 font-extrabold text-6xl text-center">
            Welcome to RoyalCars
          </h1>
          <h4 className="text-2xl font-extrabold sub-text text-gray-500">
            Scroll Down
          </h4>{" "}
        </section>
        <section className="carousel">
          <div
            className="slide slide-1 red"
            style={{
              backgroundImage: `url('./lines-traffic-paved-roads-background.jpg')`,
              backgroundSize: "contain",
            }}
          >
            <div className="box box-1">
              <img width="190px" height="100px" src="./car1.png"></img>
            </div>
          </div>
          <div
            className="slide slide-2 orange"
            style={{
              backgroundImage: `url('./lines-traffic-paved-roads-background.jpg')`,
              backgroundSize: "contain",
            }}
          >
            <div className="box box-2">
              <img width="190px" height="100px" src="./car3.png"></img>
            </div>
          </div>
          <div
            className="slide slide-3 purple"
            style={{
              backgroundImage: `url('./lines-traffic-paved-roads-background.jpg')`,
              backgroundSize: "contain",
            }}
          >
            <div className="box box-3">
              <img width="190px" height="100px" src="./car5.png"></img>
            </div>
          </div>
          <div
            className="slide slide-4 green"
            style={{
              backgroundImage: `url('./lines-traffic-paved-roads-background.jpg')`,
              backgroundSize: "contain",
            }}
          >
            <div className="box box-4">
              <img width="190px" height="100px" src="./car4.png"></img>
            </div>
          </div>
        </section>
        <section className="end yellow">END</section>
      </div>
    </div>
  );
};

export default PersonHome;
