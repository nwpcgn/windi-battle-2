export { _user, _settings, _store, _daten, _views, _currentView } from "./stores";
export { supabase, getUser } from "./supabase";
/** Dispatch event on click outside of node */
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
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
const addkomma = (int = 0) => int.toLocaleString();
export { formatBytes, clickOutside, sleep, addkomma };
