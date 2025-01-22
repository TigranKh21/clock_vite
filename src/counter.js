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

function clearAll() {
  const classes = base[8];

  for (let i = 0; i < 7; i++) {
    const elements = document.querySelectorAll(`.${classes[i]}`);
    elements.forEach(element => {
      if (element.classList.contains('color'))
        element.classList.remove("color");
    })
  }
}

function setDigitStyles(timeUnit, position, amount) {
  const counter = base[amount].length;

  for (let i = 0; i < counter; i++) {
    const onClasses = base[amount];
      const element = document.querySelector(`.${timeUnit} .${position} .${onClasses[i]}`);
      element.classList.add("color");
  }
}

setInterval(() => {
  const myDate = new Date();
  const hours = myDate.getHours();
  const minutes = myDate.getMinutes();
  const seconds = myDate.getSeconds();

  const hourUnitSecond = hours % 10;
  const hourUnitFirst = Math.floor(hours / 10)
  console.log(hourUnitFirst, hourUnitSecond);

  const minUnitSecond = minutes % 10;
  const minUnitFirst = Math.floor(minutes / 10)
  console.log(minUnitFirst, minUnitSecond);

  const secUnitSecond = seconds % 10;
  const secUnitFirst = Math.floor(seconds / 10)
  console.log(secUnitFirst, secUnitSecond);
  
  clearAll();
  setDigitStyles('hours', 'first', hourUnitFirst);
  setDigitStyles('hours', 'second', hourUnitSecond);
  setDigitStyles('minutes', 'first', minUnitFirst);
  setDigitStyles('minutes', 'second', minUnitSecond);
  setDigitStyles('seconds', 'first', secUnitFirst);
  setDigitStyles('seconds', 'second', secUnitSecond);
}, 1000);
