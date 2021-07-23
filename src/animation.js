import gsap from "gsap";

const disableButton = (setDisable) => {
  setDisable(true);
  setTimeout(() => {
    setDisable(false);
  }, 1000);
};

// testimonilas fadding animation
const testimonialsFading = (current, next, misilns, tesimonialsList) => {
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
    .to(tesimonialsList.children[misilns], {
      duration: 1,
      opacity: 0,
    });
};

// image slidr animation
const imageSlider = (currt, next, mesilns, distance, imageList) => {
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
export const slideRight = (
  state,
  setState,
  pointer,
  setPointer,
  setDisable,
  imageList,
  tesimonialsList
) => {
  disableButton(setDisable);
  //  move from image 1 to 2
  if (state.fist === true) {
    setState({ fist: false, sec: true, third: false });
    let x = pointer - 300;
    setPointer(x);
    imageSlider(0, 1, 2, x, imageList);
    testimonialsFading(0, 1, 2, tesimonialsList);
  } // move from 2 to 3
  else if (state.sec === true) {
    setState({ fist: false, sec: false, third: true });
    let x = pointer - 300;
    setPointer(x);
    imageSlider(1, 2, 0, x, imageList);
    testimonialsFading(1, 2, 0, tesimonialsList);
  } // move from 3 to 1
  else {
    setState({ fist: true, sec: false, third: false });
    let x = 0;
    setPointer(x);
    imageSlider(2, 0, 1, x, imageList);
    testimonialsFading(2, 0, 1, tesimonialsList);
  }
};

export const slideLeft = (
  state,
  setState,
  pointer,
  setPointer,
  setDisable,
  imageList,
  tesimonialsList
) => {
  disableButton(setDisable);
  //  move from image 1 to 3
  if (state.fist === true) {
    setState({ fist: false, sec: false, third: true });
    let x = -600;
    setPointer(x);
    imageSlider(0, 2, 1, x, imageList);
    testimonialsFading(0, 2, 1, tesimonialsList);
  } // move from 2 to 1
  else if (state.sec === true) {
    setState({ fist: true, sec: false, third: false });
    let x = pointer + 300;
    setPointer(x);
    imageSlider(1, 0, 2, x, imageList);
    testimonialsFading(1, 0, 2, tesimonialsList);
  } // move from 3 to 2
  else {
    setState({ fist: false, sec: true, third: false });
    let x = pointer + 300;
    setPointer(x);
    imageSlider(2, 1, 0, x, imageList);
    testimonialsFading(2, 1, 0, tesimonialsList);
  }
};
