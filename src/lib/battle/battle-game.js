import { Rocket } from "./Rocket";
import { fetchDb } from "./fetchDb";
import { initBattleOptions } from "./initBattleOptions";
import { initBattleUi } from "./initBattleUi";
const initBattleData = async () => {
  console.log("... initBattleData!");
  let err = [];
  const res = await fetchDb();
  if (res && res.player.length) {
    player = new Rocket("player", res.player);
  } else {
    err.push("player");
  }
  if (res && res.player.length) {
    enemy = new Rocket("enemy", res.enemy);
  } else {
    err.push("enemy");
  }
  if (err.length) throw new Error("fetch error");
  return res;
};
let player, enemy;

const initBattle = async () => {
  console.log("... initBattle!");
  try {
    await Promise.all([
      initBattleData(),
      initBattleOptions(3000),
      initBattleUi(),
    ]);
  } finally {
    console.log("... initBattle completed!");
  }
};

const tempL = () =>
  `<div class="flex-grow flex items-center justify-center"> <div class="loader"></div> </div>`;
const tempM = (daten) => `
  <div class="grid-container">
    <div class="sector sec1">sec1</div>
    <div class="sector sec2">sec2</div>
    <div class="sector sec3">sec3</div>
    <div class="sector sec4">sec4</div>
  </div>
`;

const main = async () => {
  try {
    console.log("... run battle! 🚀");
    await initBattle();
    console.log("... ready!");
    console.log("LIST PLAYER", player.list());
  } catch (e) {
    console.error("... aborting battle: 🛑");
    console.error(e);
  }
};

const run = async () => {
  console.log("Document Ready");
  await main();
};
