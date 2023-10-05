export class Heroes {
  constructor(name, arr = [], id = 0) {
    this._name = name;
    this._arr = arr;
    this._id = id;
  }

  list() {
    return this._arr;
  }

  get health() {
    if (this._arr.length && this._arr[this._id]) {
      return this._arr[this._id].health;
    }
  }

  set health(newValue) {
    if (
      typeof newValue === "number" &&
      this._arr.length &&
      this._arr[this._id]
    ) {
      let n = newValue < 0 ? 0 : newValue;
      this._arr[this._id].health = n;
    } else {
      console.error("Invalid Index: " + newValue);
    }
  }

  get figther() {
    if (this._arr.length && this._arr[this._id]) return this._arr[this._id];
    return false;
  }

  set figther(newValue) {
    if (typeof newValue === "number") {
      this._id = newValue;
    } else {
      console.error("Invalid Index: " + newValue);
    }
  }
}

export default Heroes;
