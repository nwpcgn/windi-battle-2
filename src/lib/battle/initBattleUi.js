export const initBattleUi = (delay = 450) => {
  console.log("... initBattleUi!");
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, delay);
  });
};
