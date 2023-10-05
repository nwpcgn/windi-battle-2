import storage from "../util/storage";
import { writable } from "svelte/store";

export const _settings = storage("nwp_settings", {
  name: "SpacePrison",
  titel: "Savage Submarine Legend",
  player: "",
  set: {
    auto_save: false,
    muted: false,
    auto_save_int: 30000,
    tick_int: 1000,
    volume: 0.2,
  },
  op: {
    op1: false,
    op2: false,
    op3: false,
    op4: false,
  },
});
// export const _store = storage("nwp_store", {});
export const _user = writable(null);
export const _daten = writable({});
export const _session = writable({});
// export const _currentView = writable("root");
