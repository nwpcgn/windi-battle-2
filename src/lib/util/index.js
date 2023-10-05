// import storage from "./storage";
// import url from "./url";
// export { storage, url };

function clickOutside(node) {
  const handleClick = (event) => {
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(new CustomEvent("click_outside", node));
    }
  };

  document.addEventListener("click", handleClick, true);

  return {
    destroy() {
      document.removeEventListener("click", handleClick, true);
    },
  };
}
function sleep(milliseconds = 1000) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
// function formatBytes(bytes, decimals = 2) {
//   if (bytes === 0) return "0 Bytes";

//   const k = 1024;
//   const dm = decimals < 0 ? 0 : decimals;
//   const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
//   const i = Math.floor(Math.log(bytes) / Math.log(k));

//   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
// }
const addkomma = (int = 0) => int.toLocaleString();
const getRandInt = (min, max) => Math.random() * (max - min) + min;

// function typewriter(node, { speed = 2 }) {
//   const valid =
//     node.childNodes.length === 1 &&
//     node.childNodes[0].nodeType === Node.TEXT_NODE;

//   if (!valid) {
//     throw new Error(
//       `This transition only works on elements with a single text node child`
//     );
//   }

//   const text = node.textContent;
//   const duration = text.length / (speed * 0.01);

//   return {
//     duration,
//     tick: (t) => {
//       const i = ~~(text.length * t);
//       node.textContent = text.slice(0, i);
//     },
//   };
// }
function randomInt(min, max) {
  // min and max included
  let n = Math.floor(Math.random() * (max - min + 1) + min);
  return n.toFixed(0);
}

const randomDelay = async (min = 1000, max = 4000) => {
  const rand = getRandInt(min, max);
  await sleep(rand);
  return true;
};

export { clickOutside, sleep, addkomma, getRandInt, randomInt, randomDelay };
