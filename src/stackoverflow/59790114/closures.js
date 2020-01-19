function closures() {
  this.after = (r, cb) => {
    counter = 1;
    return () => {
      if (counter == r) cb();
    };
  };
}

module.exports = closures;
