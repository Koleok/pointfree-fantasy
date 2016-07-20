const Constructor = require('../util').Constructor

class Sum extends Constructor {
  constructor(val) {
    super(val)
    this.val = val
  }

  map(f) {
    return Sum(f(this.val))
  }

  empty() {
    return Sum(0)
  }

  concat(s2) {
    return Sum(this.val + s2.val)
  }

  of(x) {
    return Sum(x)
  }

  ap(s2) {
    return Sum(ap(this.val, s2.val))
  }

  chain(f) {
    return f(this.val)
  }
}

const getSum = c => c.val

export default { Sum, getSum }
