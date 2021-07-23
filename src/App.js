import React, { useEffect, useRef, useState } from "react";

import "./App.scss";
import gsap from "gsap";

import { slideLeft, slideRight } from "./animation";
import { testimonials } from "./testmonials";

// icons
import { ReactComponent as LeftArrow } from "./assets/arrow-left.svg";
import { ReactComponent as RightArrow } from "./assets/arrow-right.svg";

const App = () => {
  let imageList = useRef(null);
  let tesimonialsList = useRef(null);
  const [state, setState] = useState({ fist: true, sec: false, third: false });
  const [pointer, setPointer] = useState(0);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    gsap.to(tesimonialsList.children[0], { duration: 0, opacity: 1 });
  }, []);

  return (
    <div className="testimonilas-section">
      <div className="testimonial-container">
        <div className="arrow left">
          <button
            disabled={disable}
            onClick={() =>
              slideLeft(
                state,
                setState,
                pointer,
                setPointer,
                setDisable,
                imageList,
                tesimonialsList
              )
            }
            className="icon"
          >
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
          <button
            disabled={disable}
            onClick={() =>
              slideRight(
                state,
                setState,
                pointer,
                setPointer,
                setDisable,
                imageList,
                tesimonialsList
              )
            }
            className="icon"
          >
            <RightArrow />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
