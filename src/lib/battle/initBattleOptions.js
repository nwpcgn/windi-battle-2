export const initBattleOptions = (delay = 450) => {
  console.log("... initBattleOptions!");
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, delay);
  });
};
