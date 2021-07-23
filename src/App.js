import React, { useEffect, useRef, useState } from "react";

import "./App.scss";
import gsap from "gsap";

// icons
import { ReactComponent as LeftArrow } from "./assets/arrow-left.svg";
import { ReactComponent as RightArrow } from "./assets/arrow-right.svg";
// testimonials images
import image1 from "./assets/image.jpg";
import image2 from "./assets/image2.jpg";
import image3 from "./assets/image3.jpg";

const testimonials = [
  {
    name: "Julia Cameron",
    title: "Creative Director, VISA",
    image: image1,
    quote:
      "It's all good. I was amazed at the quality of the Design. We've seen amazing results already.",
  },
  {
    name: "Mark Jacobs",
    title: "Tech Lead, Google",
    image: image2,
    quote:
      "The rebranding has really helped our business. Definitely worth the investment.",
  },
  {
    name: "Lisa Bearings",
    title: "Brand Coordinator, Facebook",
    image: image3,
    quote:
      "The service was excellent. Absolutely wonderful! A complete redesign did it for us.",
  },
];

const App = () => {
  let imageList = useRef(null);
  let tesimonialsList = useRef(null);
  const [state, setState] = useState({ fist: true, sec: false, third: false });
  const [pointer, setPointer] = useState(0);

  useEffect(() => {
    gsap.to(tesimonialsList.children[0], { duration: 0, opacity: 1 });
  }, []);

  // testimonilas fadding animation
  const testimonialsFading = (current, next, misilns) => {
    gsap
      .timeline()
      .to(tesimonialsList.children[current], {
        duration: 0.3,
        y: 10,
        opacity: 0,
      })
      .from(tesimonialsList.children[next], { duration: 0.5, y: 10 })
      .to(tesimonialsList.children[next], {
        delay: -0.5,
        y: 0,
        duration: 0.5,
        opacity: 1,
      })
      .to(tesimonialsList.children[misilns], { duration: 1, opacity: 0 });
  };

  // image slidr animation
  const imageSlider = (currt, next, mesilns, distance) => {
    const tl = gsap.timeline();
    tl.to(imageList.children[currt], {
      duration: 1,
      x: distance,
      ease: "power3.out",
    })
      .from(imageList.children[next], {
        delay: -1,
        scale: 1.4,
        duration: 1,
        ease: "power3.out",
      })
      .to(imageList.children[next], {
        delay: -1,
        scale: 1,
        duration: 1,
        x: distance,
        ease: "power3.out",
      })
      .to(imageList.children[mesilns], {
        delay: -1,
        duration: 1,
        x: distance,
        ease: "power3.out",
      });
  };

  // move right
  const slideRight = () => {
    //  move from image 1 to 2
    if (state.fist === true) {
      setState({ fist: false, sec: true, third: false });
      let x = pointer - 300;
      setPointer(x);
      imageSlider(0, 1, 2, x);
      testimonialsFading(0, 1, 2);
    } // move from 2 to 3
    else if (state.sec === true) {
      setState({ fist: false, sec: false, third: true });
      let x = pointer - 300;
      setPointer(x);
      imageSlider(1, 2, 0, x);
      testimonialsFading(1, 2, 0);
    } // move from 3 to 1
    else {
      setState({ fist: true, sec: false, third: false });
      let x = 0;
      setPointer(x);
      imageSlider(2, 0, 1, x);
      testimonialsFading(2, 0, 1);
    }
  };

  const slideLeft = () => {
    //  move from image 1 to 3
    if (state.fist === true) {
      setState({ fist: false, sec: false, third: true });
      let x = -600;
      setPointer(x);
      imageSlider(0, 2, 1, x);
      testimonialsFading(0, 2, 1);
    } // move from 2 to 1
    else if (state.sec === true) {
      setState({ fist: true, sec: false, third: false });
      let x = pointer + 300;
      setPointer(x);
      imageSlider(1, 0, 2, x);
      testimonialsFading(1, 0, 2);
    } // move from 3 to 2
    else {
      setState({ fist: false, sec: true, third: false });
      let x = pointer + 300;
      setPointer(x);
      imageSlider(2, 1, 0, x);
      testimonialsFading(2, 1, 0);
    }
  };

  return (
    <div className="testimonilas-section">
      <div className="testimonial-container">
        <div className="arrow left">
          <button onClick={() => slideLeft()} className="icon">
            <LeftArrow />
          </button>
        </div>
        <div className="inner">
          <div className="t-image">
            <ul ref={(el) => (imageList = el)}>
              {testimonials.map((testimonial) => {
                return (
                  <li className="imageItem">
                    <img src={testimonial.image} alt={testimonial.name} />
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="t-content">
            <ul ref={(el) => (tesimonialsList = el)}>
              {testimonials.map((testimonial) => {
                return (
                  <li>
                    <div className="content-inner">
                      <q className="quote">{testimonial.quote}</q>
                      <h3 className="name">{testimonial.name}</h3>
                      <h4 className="title">{testimonial.title}</h4>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="arrow right">
          <button onClick={() => slideRight()} className="icon">
            <RightArrow />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
