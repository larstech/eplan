declare global {
  // eslint-disable-next-line
  interface Array<T> {
    isEmpty(): boolean
  }
}

Array.prototype.isEmpty = function () {
  return this.length === 0
}

export {}
