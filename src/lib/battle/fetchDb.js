export const fetchDb = () =>
  fetch("./data/battle.json")
    .then((r) => r.json())
    .then((data) => data)
    .catch((e) => e);

export default fetchDb;
