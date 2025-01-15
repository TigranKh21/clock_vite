// export function setupCounter(element) {
//   let counter = 0;
//   const setCounter = (count) => {
//     counter = count;
//     element.innerHTML = `count is ${counter}`;
//   };
//   element.addEventListener("click", () => setCounter(counter + 1));
//   setCounter(0);
// }

const base = {
  0: [
    "js-top",
    "js-bottom",
    "js-top-left",
    "js-top-right",
    "js-bottom-left",
    "js-bottom-right",
  ],
  1: ["js-top-right", "js-bottom-right"],
  2: ["js-top", "js-middle", "js-bottom", "js-top-right", "js-bottom-left"],
  3: ["js-top", "js-middle", "js-bottom", "js-top-right", "js-bottom-right"],
  4: ["js-top-left", "js-top-right", "js-bottom-right", "js-middle"],
  5: ["js-top", "js-middle", "js-bottom", "js-top-left", "js-bottom-right"],
  6: [
    "js-top",
    "js-middle",
    "js-bottom",
    "js-top-left",
    "js-bottom-left",
    "js-bottom-right",
  ],
  7: ["js-top", "js-top-right", "js-bottom-right"],
  8: [
    "js-top",
    "js-middle",
    "js-bottom",
    "js-top-left",
    "js-top-right",
    "js-bottom-left",
    "js-bottom-right",
  ],
  9: [
    "js-top",
    "js-middle",
    "js-bottom",
    "js-top-left",
    "js-top-right",
    "js-bottom-right",
  ],
};

function setDigitStyles(digit) {
  const counter = base[digit].length;

  const classes = base[8];
  for (let i = 0; i < 7; i++) {
    let element = document.querySelector(`.${classes[i]}`);
    element.classList.remove("color");
    console.log(element);
  }
  for (let i = 0; i < counter; i++) {
    const onClasses = base[digit];
    console.log(onClasses);

    let element = document.querySelector(`.${onClasses[i]}`);
    element.classList.add("color");
    console.log(element);
  }
}

setDigitStyles(0);

setInterval(() => {
  const myDate = new Date();
  const seconds = myDate.getSeconds();

  setDigitStyles(seconds % 10);
}, 1000);
